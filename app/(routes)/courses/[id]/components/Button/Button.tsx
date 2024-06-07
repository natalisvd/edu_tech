"use client";
import { FC } from "react";

import { createClient } from "@/utils/supabase/client";

const updateColumn = async (description: any, oldDescription: any) => {
  console.log(description);
  const supabase = createClient();
  const { data, error } = await supabase
    .from("courses")
    .update({ Description: description })
    .eq("Description", oldDescription)
    .select();
};

interface ButtonProps {
  description: string;
  oldDescription: string;
}

const Button: FC<ButtonProps> = ({ description, oldDescription }) => {
  return (
    <button
      className="btn btn-success"
      onClick={() => updateColumn(description, oldDescription)}
    >
      Save
    </button>
  );
};

export default Button;
