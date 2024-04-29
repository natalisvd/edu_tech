"use client";

import { supabase, supabaseAdmin } from "@/lib/supabase";
import Image from "next/image";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const setNewView = async () => {
    const { data, error } = await supabaseAdmin.from("view").insert({
      name: "random name",
    });

    if (data) console.log(data);
    if (error) console.log(error);
  };

  setNewView();

  const logOut = async (e: any) => {
    e.preventDefault();
    console.log("hi");
    await supabase.auth.signOut();

    router.refresh();
  };

  return (
    <div className="container mx-auto py-8">
      <div>
        <button onClick={logOut}>LogOut</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link href="/frontend">
          <div className="bg-white p-8 rounded shadow-md cursor-pointer transition-colors duration-300 hover:bg-blue-200">
            <h2 className="text-xl font-bold mb-4">Frontend</h2>
            <p>Click and take the front end test</p>
          </div>
        </Link>
        <Link href="/backend">
          <div className="bg-white p-8 rounded shadow-md cursor-pointer transition-colors duration-300 hover:bg-blue-200">
            <h2 className="text-xl font-bold mb-4">Backend</h2>
            <p>Click and take the back end test</p>
          </div>
        </Link>
        <Link href="/fullstack">
          <div className="bg-white p-8 rounded shadow-md cursor-pointer transition-colors duration-300 hover:bg-blue-200">
            <h2 className="text-xl font-bold mb-4">Full-stack</h2>
            <p>Click and take the full-stack test</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
