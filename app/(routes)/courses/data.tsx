"use server";

import { createClient } from "@/utils/supabase/server";
import React from "react";

const Data = async () => {
  const supabase = createClient();
  let { data: courses, error } = await supabase.from("courses").select("*");
  return <div>Data</div>;
};

export default Data;
