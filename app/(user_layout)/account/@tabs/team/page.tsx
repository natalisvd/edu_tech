import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: teams, error } = await supabase
    .from("teams")
    .select("*")
    .eq("user_id", user.id);

  console.log(teams);

  return (
    <div className="flex">
      {" "}
      Your team
      {teams?.map((team) => {
        return <div>{team.team_name}</div>;
      })}
    </div>
  );
}
