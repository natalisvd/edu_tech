import Link from "next/link";
import { login } from './actions'

export default function Login() {
  return (
    <div className="container mx-auto w-[400px] grid gap-4">

      <form className="grid grid-flow-row">
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button formAction={login} className="btn btn-primary bg-[#0aa274] rounded place-self-center p-2 px-4">Log in</button>
        <div className="flex justify-center mt-5">
          <span>
            don't have an account?{" "}
            <Link href={"/signup"} className="text-[#0aa274] font-semibold">
              register
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
