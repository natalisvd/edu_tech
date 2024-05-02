import React from "react";
import { signUp } from "./actions";
import { FormCard } from "@/app/components/FormCard";
import { Input } from "@/app/components/Input";
import { UserIcon } from "@/app/components/Icons/UserIcon";
import { PasswordLockIcon } from "@/app/components/Icons/PasswordLockIcon";
import Link from "next/link";

const SignUp = () => {
  // Todo: add validation for password confirmation
  return (
    <FormCard>
      <form className="grid grid-flow-row gap-8">
        <h2 className="text-3xl font-semibold text-center mb-2">Create new account</h2>
        <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Email"
            icon={<UserIcon className="input-icon w-5 h-5" />}
          />
          <Input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Password"
            icon={<PasswordLockIcon className="input-icon w-5 h-5" />}
          />
          <Input
            id="confirm"
            name="confirm"
            type="password"
            required
            placeholder="Confirm Password"
            icon={<PasswordLockIcon className="input-icon w-5 h-5" />}
          />
        <button
          formAction={signUp}
          className="btn btn-primary rounded-full w-full mt-5 text-base"
        >
          Sign Up
        </button>
        <div className="flex justify-center">
          <span className="text-sm">
            Already have an account?{" "}
            <Link href={"/login"} className="text-primary font-semibold">
              Sign in
            </Link>
          </span>
        </div>
      </form>
    </FormCard>
  );
};

export default SignUp;
