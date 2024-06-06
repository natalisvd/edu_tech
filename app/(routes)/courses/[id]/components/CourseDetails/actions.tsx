import { createClient } from "@/utils/supabase/client";

export const updateColumn = async (description: any, oldDescription: any) => {
  console.log(description);
  const supabase = createClient();
  const { data, error } = await supabase
    .from("courses")
    .update({ Description: description })
    .eq("Description", oldDescription)
    .select();
};

export const updateColumnName = async (
  description: any,
  oldDescription: any
) => {
  console.log(description);
  const supabase = createClient();
  const { data, error } = await supabase
    .from("courses")
    .update({ name: description })
    .eq("name", oldDescription)
    .select();
};
