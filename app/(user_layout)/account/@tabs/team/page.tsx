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
  return (
    <div className="flex flex-col">
      {" "}
      <div className="mb-5">
        {" "}
        Your team
        {teams?.map((team) => {
          return <div>{team.team_name}</div>;
        })}
      </div>
      <div>
        {" "}
        <Users users={users} />
      </div>
    </div>
  );
}
