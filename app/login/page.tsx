"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [data, setData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const login = async () => {
    try {
      let { data: dataUser, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (dataUser) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto w-[400px] grid gap-4">
      <div className="grid">
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={data?.email}
          onChange={handleChange}
        />
      </div>
      <div className="grid">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={data?.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <button
          className="px-4 py-2 bg-blue-500 rounded cursor-pointer"
          onClick={login}
        >
          Login
        </button>
      </div>
    </div>
  );
}

{
  /* <div className="container mx-auto max-w-[100%]">
<div className="grid">
  <label className="font-bold">Email</label>
  <input
    type="text"
    name="email"
    value={dataUser?.email}
    onChange={handleChange}
    className="border border-gray-300 rounded-md px-3 py-2 w-full"
  />
</div>
<div className="grid">
  <label className="font-bold">Login</label>
  <input
    type="password"
    name="password"
    value={dataUser?.password}
    onChange={handleChange}
    className="border border-gray-300 rounded-md px-3 py-2 w-full"
  />
</div>
<div>
  <button
    onClick={login}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    Login
  </button>
</div>
</div> */
}
