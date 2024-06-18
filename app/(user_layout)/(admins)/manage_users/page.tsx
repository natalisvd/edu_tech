import { createClient } from "@/utils/supabase/server";
import Button from "./button";

const Page = async () => {
  const supabase = createClient();

  let { data: profiles, error } = await supabase.from("profiles").select("*");

  return (
    <div className="text-xl">
      {profiles?.map((user) => (
        <div className="flex mt-5">
          <div>{user.first_name}</div>
          <div>
            <Button id={user.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
