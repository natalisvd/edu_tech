import { createClient } from "@/utils/supabase/server";

const Page = async () => {
  const supabase = createClient();
  const {
    data: { users },
    error,
  } = await supabase.auth.admin.listUsers();
  console.log("users", users);
  return <div className="text-xl">Page</div>;
};

export default Page;
