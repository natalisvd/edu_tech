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

// start

const setUser = async ({ id, teamId }: { id: any; teamId: any }) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("teams")
    .insert([{ user_id: id, team_id: teamId }])
    .select();

  console.log(data);
  return data;
};

export async function createTeam(teamName: string, id: string) {
  console.log("teamName", teamName);
  const supabase = createClient();

  // Додаємо нову команду
  const { data: insertData, error: insertError } = await supabase
    .from("teamlist")
    .insert([{ team_name: teamName }])
    .select();

  if (insertError) {
    throw new Error(insertError.message);
  }

  console.log("Inserted Data:", insertData);

  // Виконуємо запит, щоб знайти додане поле за його назвою
  let { data: teamlist, error: selectError } = await supabase
    .from("teamlist")
    .select("*")
    .eq("team_name", teamName);

  if (selectError) {
    throw new Error(selectError.message);
  }

  // Витягуємо ID з доданого запису
  const newTeamId = teamlist[0]?.id;

  console.log("New Team ID:", newTeamId);
  const { data, error } = await supabase
    .from("teams")
    .insert([{ team_id: newTeamId, user_id: id }]);
  console.log("ID:", data);

  return { insertData, newTeamId };
}

const setLeadRole = async (id: string, teamId: number) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("teamleaders")
    .insert([{ leader_id: id, team_id: teamId }])
    .select();
};

const getTeamName = async (id: number) => {
  const supabase = createClient();
  let { data: teamlist, error: selectError } = await supabase
    .from("teamlist")
    .select("*")
    .eq("id", id);

  console.log("teamlist2", id);
  console.log("teamlist2", teamlist[0].team_name);
  return teamlist[0].team_name;
};

export { detectRole, setRole, getTeam, setUser, setLeadRole, getTeamName };
