import Data from "./data";
import Card from "./Card";
import Select from "../../components/Select/Select";
import { createClient } from "@/utils/supabase/server";

export async function getServerSideProps() {
  const supabase = createClient();
  const { data: courses, error } = await supabase.from("courses").select("*");

  if (error) {
    console.error("Error fetching courses:", error.message);
    return {
      props: {
        courses: [],
      },
    };
  }

  return {
    props: {
      courses: courses || [],
    },
  };
}
