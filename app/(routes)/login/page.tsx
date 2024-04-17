"use client";

import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { styles } from "./styles";

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
      <div className={styles.wrapper}>
        <div className={styles.form}>
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
    <main className={styles.wrapper}>
      <form className={styles.form}>
        <div className="w-96 m-auto py-8">
          <h2 className={styles.loginHeader}>Login</h2>
          <div className={styles.inputWrapper}>
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
              className={styles.input}
            />
          </div>

          <div className="border-b  mt-5 border-b-[1px] border-[#BDBDBD] justify-items-center flex">
            <Image
              src="/icons/password.svg"
              alt="Password Icon"
              width="18"
              height="18"
              priority
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={styles.input}
            />
          </div>

          <div className={styles.checkboxWrapper}>
            <input type="checkbox" />
            <span className={styles.rememberMeText}>Remember me</span>
          </div>
          <button onClick={handleSignIn} className={styles.signInButton}>
            Sign In
          </button>
          <div className="flex justify-center mt-5">
            <span className={styles.registerLink}>
              don't have an account?{" "}
              <Link href={"/signup"} className="text-[#0aa274] font-semibold">
                register
              </Link>
            </span>
          </div>
        </div>
      </form>

      <div className={styles.bgImageWrapperTR}>
        <Image
          src="/bg_rt.svg"
          alt="Background Right Top Image"
          className={styles.bgImage}
          fill
          priority
        />
      </div>
      <div className={styles.bgImageWrapperLB}>
        <Image
          src="/bg_lb.svg"
          className={styles.bgImage}
          alt="Background Left Bottom Image"
          fill
          priority
        />
      </div>
    </main>
  );
}
