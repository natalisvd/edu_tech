"use client";

import { createClient } from "@/utils/supabase/server";
import { useRouter } from "next/navigation";

const Button = () => {
  const supabase = createClient();
  const router = useRouter();
  const logOut = async (e: any) => {
    e.preventDefault();
    console.log("hi");
    await supabase.auth.signOut();

    router.refresh();
  };
  return <div onClick={logOut}>LogOut</div>;
};

export default Button;
