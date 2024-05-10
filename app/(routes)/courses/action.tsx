import Data from "./data";
import Card from "./Card";
import Select from "../../components/Select/Select";
import { createClient } from "@/utils/supabase/server";

export async function getCourses() {
  const supabase = createClient();
  const { data: courses, error } = await supabase.from("courses").select("*");
  console.log('courses', courses)

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
