import Link from "next/link";
import { LogoutButton } from "./components/LogoutButton/LogoutButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  console.log("data.user", data?.user);

  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto py-8">
      <div>
        <LogoutButton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link href="/frontend">
          <div className="bg-base-100 border border-base-200 p-8 rounded shadow-md cursor-pointer transition-colors duration-300 hover:bg-base-200">
            <h2 className="text-xl font-bold mb-4">Frontend</h2>
            <p>Click and take the front end test</p>
          </div>
        </Link>
        <Link href="/backend">
          <div className="bg-base-100 border border-base-200 p-8 rounded shadow-md cursor-pointer transition-colors duration-300 hover:bg-base-200">
            <h2 className="text-xl font-bold mb-4">Backend</h2>
            <p>Click and take the back end test</p>
          </div>
        </Link>
        <Link href="/fullstack">
          <div className="bg-base-100 border border-base-200 p-8 rounded shadow-md cursor-pointer transition-colors duration-300 hover:bg-base-200">
            <h2 className="text-xl font-bold mb-4">Full-stack</h2>
            <p>Click and take the full-stack test</p>
          </div>
        </Link>
      </div>
      {/* <Button /> */}
    </div>
  );
}
