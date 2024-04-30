import Link from "next/link";
import { login } from "./actions";
import Image from "next/image";
import { styles } from "./styles";

export default function Login() {
  return (
    <main className={styles.wrapper}>
      <form className={styles.form}>
        <div className="w-96 m-auto py-8">
          <h2 className={styles.loginHeader}>Login</h2>
          <div className={styles.inputWrapper}>
            <Image
              src="/icons/user.svg"
              alt="User Icon"
              width={18}
              height={18}
              priority
            />
            <input id="email" name="email" type="email" required />
          </div>

          <div className="border-b  mt-5 border-b-[1px] border-[#BDBDBD] justify-items-center flex">
            <Image
              src="/icons/password.svg"
              alt="Password Icon"
              width="18"
              height="18"
              priority
            />
            <input id="password" name="password" type="password" required />
          </div>

          <div className={styles.checkboxWrapper}>
            <input type="checkbox" />
            <span className={styles.rememberMeText}>Remember me</span>
          </div>
          <button formAction={login} className={styles.signInButton}>
            Sign In
          </button>
          <div className="flex justify-center mt-5">
            <span className={styles.registerLink}>
              don't have an account?{" "}
              <Link href={"/signup"} className="text-[#0aa274] font-semibold">
                register
              </Link>
            </span>
          </div>
        </div>
      </form>

      <div className={styles.bgImageWrapperTR}>
        <Image
          src="/bg_rt.svg"
          alt="Background Right Top Image"
          className={styles.bgImage}
          fill
          priority
        />
      </div>
      <div className={styles.bgImageWrapperLB}>
        <Image
          src="/bg_lb.svg"
          className={styles.bgImage}
          alt="Background Left Bottom Image"
          fill
          priority
        />
      </div>
    </main>
  );
}
