"use server";

import { createClient } from "@/utils/supabase/server";

const handleClick = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lessons")
    .insert([{ lvl: "1", name: "react-course" }])
    .select();

  if (error) {
    console.error("Error creating lesson:", error);
  } else {
    console.log("Lesson created:", data);
  }
};

export default handleClick;
