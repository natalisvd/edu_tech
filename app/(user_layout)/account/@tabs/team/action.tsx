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
