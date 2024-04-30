"use client"

import { createClient } from "@/utils/supabase/server";
import { useRouter } from "next/navigation";



export const logOut = async (e: any) => {

    const supabase = createClient();
    e.preventDefault();
    console.log("hi");
    await supabase.auth.signOut();

    router.refresh();
};


