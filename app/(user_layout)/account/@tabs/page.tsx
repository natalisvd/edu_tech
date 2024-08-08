"use client";
import { Suspense } from "react";
import AccountForm from "../account-form";
// import { createClient } from "@/utils/supabase/server";
import { Loading } from "../loading-form";
import { useAppSelector } from "@/app/store/hooks";
import { selectCurrentUser } from "@/app/store/slices/userSlice";

export default async function Account() {
  // const supabase = createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  const { user } = useAppSelector(selectCurrentUser);

  return (
    <div className="container p-3">
      <h1 className="text-3xl font-semibold leading-loose mb-8">
        Account Settings
      </h1>
      <div>
        <Suspense fallback={<Loading />}>
          <AccountForm user={user} />
        </Suspense>
      </div>
    </div>
  );
}
