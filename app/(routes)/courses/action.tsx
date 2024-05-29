import { createClient } from "@/utils/supabase/server";
import { createClient as creaClientonClien } from "@/utils/supabase/client";

export async function getCourses() {
  const supabase = createClient();
  const { data: courses, error } = await supabase.from("courses").select("*");

  if (error) {
    console.error("Error fetching courses:", error.message);
    return {
      courses: [],
    };
  }

  return {
    courses: courses || [],
  };
}

export async function getCoursesById(id: any) {
  const supabase = creaClientonClien();
  let { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id);
}
