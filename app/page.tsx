import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="flex min-h-screen flex-col items-center text-[#fff] justify-between p-24 bg-[#000]">
        <Link href={"/login"}>
          You are not logged in. Click here to go login.
        </Link>
      </main>
    );
  }
  return (
    <div className="container mx-auto py-8">
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
