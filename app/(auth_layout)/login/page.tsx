import Link from "next/link";
import { login } from "./actions";
import { UserIcon } from "../../components/Icons/UserIcon";
import { PasswordLockIcon } from "../../components/Icons/PasswordLockIcon";
import { Input } from "../../components/Input";
import { FormCard } from "@/app/components/FormCard";

export default function Login() {
  return (
    <FormCard>
      <form className="grid grid-flow-row gap-8">
        <h2 className="text-3xl font-semibold text-center mb-2">Login</h2>
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
        {/* ToDo: add "remember me" functionality or remove this part of form */}
        <div className="form-control w-max">
          <label className="label cursor-pointer gap-3">
            <input
              name="remember"
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-sm rounded-sm"
            />
            <span className="label-text">Remember me</span>
          </label>
        </div>
        <button
          formAction={login}
          className="btn btn-primary rounded-full w-full mt-5 text-base"
        >
          Sign In
        </button>
        <div className="flex justify-center">
          <span className="text-sm">
            Don't have an account?{" "}
            <Link href={"/signup"} className="text-primary font-semibold">
              Sign Up
            </Link>
          </span>
        </div>
      </form>
    </FormCard>
  );
}
