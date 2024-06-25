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
    <div className="flex flex-col">
      <div className="mb-5">
        Your team
        {teamNames.map((teamName, index) => (
          <div key={index}>{teamName}</div>
        ))}
      </div>
      <div>
        <Users users={users} teamNames={teamNames} />
      </div>
    </div>
  );
}
