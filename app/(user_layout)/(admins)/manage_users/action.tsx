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

const setRole = async (id: string) => {
  console.log("server action fired with id:", id);
  const supabase = createClient();

  const { data, error } = await supabase
    .from("role_to_user")
    .update({ role_id: 1 })
    .eq("user_id", id)
    .select();

  if (error) {
    console.error("Error fetching role:", error);
    return null;
  }

  console.log("role_to_user data:", data);
  return data;
};

export { detectRole, setRole };
