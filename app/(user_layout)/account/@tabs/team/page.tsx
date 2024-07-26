import { createClient } from "@/utils/supabase/server";
import { getUsers } from "./action";
import Users from "./Users";
import CreateTeam from "./CreateTeam";
import {  IUserWithTeam } from "@/app/interfaces/interfaces";

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>User not found.</div>;
  }

  let { data: teams, error: teamsError } = await supabase
    .from("teams")
    .select("*")
    .eq("user_id", user.id);

  if (teamsError || !teams) {
    console.error("Error fetching teams:", teamsError);
    return <div>Error fetching teams.</div>;
  }

  let { data: teamleaders, error: teamleadersError } = await supabase
    .from("teamleaders")
    .select("*")
    .eq("leader_id", user.id);

  if (teamleadersError || !teamleaders) {
    console.error("Error fetching team leaders:", teamleadersError);
    return <div>Error fetching team leaders.</div>;
  }

  const getTeam = async (teamId: string): Promise<string | null> => {
    let { data: teamlist, error } = await supabase
      .from("teamlist")
      .select("*")
      .eq("id", teamId);

    if (error || !teamlist || teamlist.length === 0) {
      console.error("Error fetching team list:", error);
      return null;
    }

    return teamlist[0].team_name;
  };

  let teamlists: Record<string, string> = {};

  if (teamleaders && teams) {
    const teamPromises = teamleaders.map(async (lead) => {
      const teamList = await getTeam(lead.team_id);
      if (teamList) {
        teamlists[lead.team_id] = teamList;
      }
    });

    await Promise.all(teamPromises);
  }

  const users = await getUsers() as IUserWithTeam[];

  const teamNames = teams?.map((team) => team.team_name) || [];
  const teamLeaderNames = teamleaders?.map((leader) => leader.leader_name) || [];

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
              {teamlists[teams[index]?.team_id || ""] || "Team name not found"}
            </div>
          ))}
        </div>
        {teamNames.length < 1 && <CreateTeam id={user.id} />}
      </div>
      <div>
        <Users users={users} teamId={teams[0]?.team_id || ''} />
      </div>
    </div>
  );
}
