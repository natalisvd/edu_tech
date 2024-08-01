//TODO need typezation
// @ts-nocheck
import { createClient } from "@/utils/supabase/server";
import {
  ITeamLeaderWithTeams,
  IUserWithTeam,
} from "@/app/interfaces/interfaces";
import { getUsers } from "./action";
import CreateTeam from "./CreateTeam";
import Users from "./Users";

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>User not found.</div>;
  }
  const { data: teamleadersWithTeams, error: teamleadersError } = await supabase
    .from("teamleaders")
    .select("*")
    .select("teamlist(*)")
    .eq("leader_id", user.id);

  if (teamleadersError || !teamleadersWithTeams) {
    console.error("Error fetching team leaders:", teamleadersError);
    return <div>Error fetching team leaders.</div>;
  }

  const users = (await getUsers()) as IUserWithTeam[];

  // Extract team names from teamleadersWithTeams
  const teamNames = teamleadersWithTeams.map(
    (leader) => leader.teams.team_name
  );


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
            </div>
          ))}
        </div>
        {teamNames.length < 1 && <CreateTeam id={user.id} />}
      </div>
      <div>
        <Users
          users={users}
          teamId={teamleadersWithTeams[0]?.teams?.team_id || ""}
        />
      </div>
    </div>
  );
}
