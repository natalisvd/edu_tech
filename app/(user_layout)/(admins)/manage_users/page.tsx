import { createClient } from "@/utils/supabase/server";
import Button from "./button";
import { detectRole, setRole, getTeam } from "./action";

const Page = async () => {
  const supabase = createClient();

  let { data: profiles, error } = await supabase.from("profiles").select("*");

  if (error) {
    console.error("Error fetching profiles:", error);
    return <div>Error loading profiles</div>;
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>name</th>
              <th>admin</th>
              <th>team</th>
            </tr>
          </thead>
          <tbody>
            {profiles?.map((user) => (
              <tr key={user.id}>
                <th></th>
                <td>{user.first_name ? user.first_name : "some user"}</td>
                <td>
                  {user.role_id === 1 ? (
                    <span>admin</span>
                  ) : (
                    <Button id={user.id} />
                  )}
                </td>
                <td>{getTeam(user.id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
