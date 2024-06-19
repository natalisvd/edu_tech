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
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="w-full bg-gray-200 text-left">
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Admin</th>
              <th className="px-4 py-2 border">Team</th>
            </tr>
          </thead>
          <tbody>
            {profiles?.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">
                  {user.first_name ? user.first_name : "some user"}
                </td>
                <td className="px-4 py-2 border">
                  {user.role_id === 1 ? (
                    <span className="text-green-600">admin</span>
                  ) : (
                    <Button id={user.id} />
                  )}
                </td>
                <td className="px-4 py-2 border">{getTeam(user.id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
