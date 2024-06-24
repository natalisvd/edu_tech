import { createClient } from "@/utils/supabase/server";

export const getUsers = async () => {
  const supabase = createClient();
  let { data: profiles, error } = await supabase.from("profiles").select("*");

  return profiles;
};
