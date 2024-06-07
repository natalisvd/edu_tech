"use server";

import { createClient } from "@/utils/supabase/server";

const createNewLesson = async () => {
  console.log('server action fired')
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lessons")
    .insert([{ lvl: "1", name: "react-course" }])
    .select();
    console.log('returned new data', data)
    
    if (error) {
      console.error("Error creating lesson:", error);
      throw error
    } else {
      console.log("Lesson created:", data);
      return data
  }
};

export default createNewLesson;
