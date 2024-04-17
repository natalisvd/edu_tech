"use client";

import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }

    getUser();
  }, []);

  const handleSignIn = async () => {
    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setUser(res.data.user);
    router.refresh();
    setEmail("");
    setPassword("");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    setUser(null);
  };

  console.log({ loading, user });

  if (loading) {
    return <h1>loading..</h1>;
  }

  if (user) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md w-96 text-center">
          <h1 className="mb-4 text-xl font-bold text-gray-700 dark:text-gray-300">
            You're already logged in
          </h1>
          <button
            onClick={handleLogout}
            className="w-full p-3 rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="h-screen flex items-center justify-center bg-[#fff] p-6 relative">
      <form className="shadow-lg p-8 rounded-lg shadow-md w-[526px] z-20">
        <div className="w-96 m-auto py-8">
          <h2 className="text-[#000] text-3xl font-semibold text-center mt-[8px] mb-[8px]">
            Login
          </h2>
          <div className="border-b border-b-[1px] border-[#BDBDBD] justify-items-center flex">
            <Image
              src="/icons/user.svg"
              alt="User Icon"
              width={18}
              height={18}
              priority
            />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 text-sm text-[#BDBDBD] placeholder-[#BDBDBD] focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="border-b  mt-5 border-b-[1px] border-[#BDBDBD] justify-items-center flex">
            <Image
              src="/icons/password.svg"
              alt="Password Icon"
              width={18}
              height={18}
              priority
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 text-sm text-[#BDBDBD] placeholder-[#BDBDBD] focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mt-5 flex">
            <input type="checkbox" />
            <span className="text-black text-sm font-light ml-2">
              Remember me
            </span>
          </div>
          <button
            onClick={handleSignIn}
            className="w-full mt-5 p-3 rounded-full bg-[#03A473] font-medium text-sm text-white hover:bg-gray-600 focus:outline-none"
          >
            Sign In
          </button>
          <div className="flex justify-center mt-5">
            <span className="text-black text-sm font-light">
              don't have an account?{" "}
              <Link href={"/signup"} className="text-[#0aa274] font-semibold">
                register
              </Link>
            </span>
          </div>
        </div>
      </form>

      <div className="absolute bg-[#fff] top-0 right-0 z-10  w-[210px] h-[140px] md:w-[750px] md:h-[500px]">
        <Image
          src="/bg_rt.svg"
          alt="Background Right Top Image"
          className="bg-[#fff]"
          layout="fill"
          priority
        />
      </div>
      <div className="absolute bottom-0  bg-[#fff] left-0 z-10 w-[210px] h-[140px] md:w-[750px] md:h-[500px]">
        <Image
          src="/bg_lb.svg"
          className="bg-[#fff]"
          alt="Background Left Bottom Image"
          layout="fill"
          priority
        />
      </div>
    </main>
  );
}
