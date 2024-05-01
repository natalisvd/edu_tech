import Link from "next/link";
import { login } from "./actions";
import Image from "next/image";
import { styles } from "./styles";
import { UserIcon } from "../components/Icons/UserIcon"; 
import { PasswordLockIcon } from "../components/Icons/PasswordLockIcon";
import { Input } from "../components/Input";

export default function Login() {
  return (
    <main className={styles.wrapper}>
      <form className={styles.form}>
        <div className="w-full m-auto py-8">
          <h2 className={styles.loginHeader}>Login</h2>
          <div className="grid grid-flow-row gap-6">
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
            <div className="form-control w-max">
              <label className="label cursor-pointer gap-3">
                <input type="checkbox" defaultChecked className="checkbox checkbox-sm rounded-sm" />
                <span className="label-text">Remember me</span> 
              </label>
            </div>
            <button formAction={login} className={styles.signInButton}>
              Sign In
            </button>
          </div>
          <div className="flex justify-center mt-5">
            <span className={styles.registerLink}>
              don't have an account?{" "}
              <Link href={"/signup"} className="text-primary font-semibold">
                register
              </Link>
            </span>
          </div>
        </div>
      </form>

      <div className="absolute top-0 right-0 z-10  w-[210px] h-[140px] md:w-[750px] md:h-[500px]">
        <Image
          src="/bg_rt.png"
          alt="Background Right Top Image"
          fill
          priority
        />
      </div>
      <div className="absolute bottom-0 left-0 z-10 w-[210px] h-[140px] md:w-[750px] md:h-[500px]">
        <Image
          src="/bg_lb.png"
          alt="Background Left Bottom Image"
          fill
          priority
        />
      </div>
    </main>
  );
}
