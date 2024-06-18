import { createClient } from "@/utils/supabase/server";
import Button from "./button";

const Page = async () => {
  const supabase = createClient();

  let { data: profiles, error } = await supabase.from("profiles").select("*");
  console.log(profiles);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>name</th>
              <th>admin</th>
            </tr>
          </thead>
          <tbody>
            {profiles?.map((user) => (
              <tr key={user.id}>
                <th></th>
                <td>{user.first_name ? user.first_name : "some user"}</td>
                <td>
                  {user.role_id === "" ? "admin" : <Button id={user.id} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
