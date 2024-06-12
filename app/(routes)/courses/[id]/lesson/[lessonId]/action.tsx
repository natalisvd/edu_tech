"use server";

import { createClient } from "@/utils/supabase/server";

const createNewTest = async () => {
  console.log("server action fired");
  const supabase = createClient();

  const { data, error } = await supabase
    .from("tests")
    .insert([{ question: "otherValue" }])
    .select();

  if (error) {
    console.error("Error creating lesson:", error);
    throw error;
  } else {
    console.log("Lesson created:", data);
    return data;
  }
};

export default createNewTest;
