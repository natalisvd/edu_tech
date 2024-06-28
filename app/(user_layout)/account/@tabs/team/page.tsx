import { createClient } from "@/utils/supabase/server";
import { getUsers, isAdmin } from "./action";
import Users from "./users";
import CreateTeam from "./CreateTeam";
import { createTeam } from "./action";

export default async function Page() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: teams, error } = await supabase
    .from("teams")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching teams:", error);
    return <div>Error fetching teams.</div>;
  }

  let { data: teamleaders, error: teamleadersError } = await supabase
    .from("teamleaders")
    .select("*")
    .eq("leader_id", user.id);

  if (teamleadersError) {
    console.error("Error fetching team leaders:", teamleadersError);
    return <div>Error fetching team leaders.</div>;
  }

  const getTeam = async (id) => {
    let { data: teamlist, error } = await supabase
      .from("teamlist")
      .select("*")
      .eq("id", id);

    if (error) {
      console.error("Error fetching team list:", error);
      return [];
    }

    return teamlist;
  };

  let teamlists = {};

  if (teamleaders) {
    const teamPromises = teamleaders.map(async (lead) => {
      const teamList = await getTeam(lead.team_id);
      teamlists[lead.team_id] = teamList;
    });

    await Promise.all(teamPromises);
  }

  const users = await getUsers();

  const teamNames = teams?.map((team) => team.team_name) || [];
  const teamLeaderNames =
    teamleaders?.map((leader) => leader.leader_name) || [];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Your Team</h2>

        <div className="space-y-2">
          {teamNames.map((teamName, index) => (
            <div
              key={index}
              className="p-2 bg-white shadow rounded text-gray-800"
            >
              {teamName}
              {teamlists[teamName] && (
                <div className="pl-4">
                  {teamlists[teamName].map((member, memberIndex) => (
                    <div
                      key={memberIndex}
                      className="p-1 bg-gray-200 rounded mt-1"
                    >
                      {member.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <CreateTeam teamName={"kdkdkkd"} id={user.id} />
      </div>
      <div>
        <Users users={users} teamNames={teamNames} />
      </div>
    </div>
  );
}
