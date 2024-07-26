import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { UserMenu } from "./UserMenu";
import { TeamleadMenu } from "./TeamleadMenu";
import { AdminMenu } from "./AdminMenu";

// -- https://github.com/supabase/postgrest-js/issues/303
// -- While the issue about supabase types for '.single()' and '.maybeSingle()' is not completed
// –- I will use this type definition for query result

type RoleResponse = { role_name?: string };

async function getRole() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const {
    data: role_to_user,
    error,
    status,
  } = await supabase
    .from("role_to_user")
    .select(
      `
      role (
        role_name
      )
    `
    )
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  if (error && status !== 406) {
    console.log("Error:", error.message);
    return "Developer";
  }

  const role_name = role_to_user?.role[0]?.role_name ?? "Developer";
   return role_name;
}

export const Sidebar = async () => {
  const userRole = await getRole();
  const isTeamleadOrAdmin = ["Teamlead", "Admin"].includes(userRole);

  return (
    <div className="drawer-side mt-16">
      <label
        htmlFor="left-sidebar-menu"
        aria-label="close sidebar"
        className="drawer-overlay"
      />
      <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content">
        {/* All users links */}
        <UserMenu />
        {/* Teamlead links */}
        {isTeamleadOrAdmin && <TeamleadMenu />}
        {/* Admin links */}
        {userRole === "Admin" && <AdminMenu />}
      </ul>
    </div>
  );
};
