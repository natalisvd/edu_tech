import { createClient } from "@/utils/supabase/server";
import { getUsers } from "./action";
import Users from "./users";

export default async function Page() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: teams, error } = await supabase
    .from("teams")
    .select("*")
    .eq("user_id", user.id);

  const users = await getUsers();
  console.log("users", users);

  const teamNames = teams?.map((team) => team.team_name) || [];

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
      </div>
      <div>
        <Users users={users} teamNames={teamNames} />
      </div>
    </div>
  );
}
