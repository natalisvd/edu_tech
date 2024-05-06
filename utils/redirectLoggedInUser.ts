import { redirect } from "next/navigation";
import { createClient } from "./supabase/server"

const redirectLoggedInUser = async (path: string = '/') => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  if (Boolean(user)) {
    return redirect(path);
  }

  return null;
}

export { redirectLoggedInUser };
