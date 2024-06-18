"use server";

import { createClient } from "@/utils/supabase/server";

const detectRole = async (id: string) => {
  console.log("server action fired with id:", id);
  const supabase = createClient();
  let { data: role_to_user, error } = await supabase
    .from("role_to_user")
    .select("*")
    .eq("user_id", id)
    .single();

  if (error) {
    console.error("Error fetching role:", error);
    return null;
  }

  console.log("role_to_user data:", role_to_user);
  return role_to_user;
};

export default detectRole;
