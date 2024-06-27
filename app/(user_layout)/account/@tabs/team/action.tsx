import { createClient } from "@/utils/supabase/server";

export const getUsers = async () => {
  const supabase = createClient();
  let { data: profiles, error } = await supabase.from("profiles").select("*");

  return profiles;
};

export const setUser = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("teams")
    .insert([{ some_column: "someValue", other_column: "otherValue" }])
    .select();
};

export const isAdmin = async ({ id }: { id: any }) => {
  console.log("iddfdsfsdf", id);
  const supabase = createClient();
  let { data: teamleaders, error } = await supabase
    .from("teamleaders")
    .select("*")
    .eq("leader_id", id);
  console.log("teamleaders", teamleaders);
  return teamleaders;
};
