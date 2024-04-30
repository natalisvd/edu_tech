"use client"

import { createClient } from "@/utils/supabase/server";
// import { useRouter } from "next/navigation";

export const logOut = async () => {

  console.log("hi");
  // const router = useRouter(); 
  const supabase = await createClient();
  
  await supabase.auth.signOut();

  // router.refresh();
};



