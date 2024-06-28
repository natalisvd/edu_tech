"use server";

import { createClient } from "@/utils/supabase/server";

const detectRole = async (id: string) => {
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

  return role_to_user;
};

const setRole = async (id: string) => {
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

  return data;
};

const getTeam = async (id: string) => {
  console.log("server action fired with id:", id);
  const supabase = createClient();

  let { data: teams, error } = await supabase
    .from("teams")
    .select("*")

    // Filters
    .eq("user_id", id);

  if (error) {
    console.error("Error fetching role:", error);
    return null;
  }

  return teams;
};

const setUser = async ({ id, teamNames }: { id: any; teamNames: string }) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("teams")
    .update({ user_id: "cd60e98c-38d2-4d67-a818-7b62caf4d784" })
    .eq("some_column", "someValue")
    .select();

  console.log(data);
  return data;
};

export async function createTeam(teamName: string, id: string) {
  console.log("teamName", teamName);
  const supabase = createClient();

  const { data, error } = await supabase
    .from("teams")
    .insert([{ team_name: teamName, user_id: id }]);

  if (error) {
    throw new Error(error.message);
  }
  console.log(data);
  return data;
}

export { detectRole, setRole, getTeam, setUser };
