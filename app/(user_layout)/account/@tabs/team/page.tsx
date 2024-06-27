import { createClient } from "@/utils/supabase/server";
import { getUsers, isAdmin } from "./action";
import Users from "./users";

export default async function Page() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const getTeam = async ({ id }: { id: any }) => {
    let { data: teamlist, error } = await supabase
      .from("teamlist")
      .select("*")
      .eq("id", id);

    console.log("teamlist", teamlist);
  };

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
  console.log("teamleaders", teamleaders);
  console.log("userid", user.id);
  if (teamleaders) {
    teamleaders?.map((leads) => {
      return getTeam(leads.team_id);
    });
  }
  if (teamleadersError) {
    console.error("Error fetching team leaders:", teamleadersError);
    return <div>Error fetching team leaders.</div>;
  }

  const users = await getUsers();

  const teamNames = teams?.map((team) => team.team_name) || [];
  const teamLeaderNames =
    teamleaders?.map((leader) => leader.leader_name) || [];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Your Team</h2>
        <div></div>
        <div className="space-y-2">
          {teamNames.map((teamName, index) => (
            <div
              key={index}
              className="p-2 bg-white shadow rounded text-gray-800"
            >
              {teamName}
            </div>
          ))}
        </div>
      </div>
      <div>
        <Users users={users} teamNames={teamNames} />
      </div>
    </div>
  );
}
