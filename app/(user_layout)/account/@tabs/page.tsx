"use client";
import { Suspense } from "react";
import AccountForm from "../account-form";
import { Loading } from "../loading-form";


export default  function Account() {

  return (
    <div className="container p-3">
      <h1 className="text-3xl font-semibold leading-loose mb-8">
        Account Settings
      </h1>
      <div>
        <Suspense fallback={<Loading />}>
          <AccountForm />
        </Suspense>
      </div>
    </div>
  );
}
