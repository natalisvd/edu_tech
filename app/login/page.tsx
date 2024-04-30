import Link from "next/link";
import { login } from "./actions";
import Image from "next/image";
import { styles } from "./styles";

export default function Login() {
  return (
    <main className={styles.wrapper}>
      <form className={styles.form}>
        <div className="w-full m-auto py-8">
          <h2 className={styles.loginHeader}>Login</h2>
          <div className={styles.inputWrapper}>
            <Image
              src="/icons/user.svg"
              alt="User Icon"
              width={18}
              height={18}
              priority
              style={{ width: 'auto', height: "18px" }}
            />
            <input id="email" name="email" type="email" required className="w-full" />
          </div>

          <div className="border-b  mt-5 border-neutral justify-items-center flex">
            <Image
              src="/icons/password.svg"
              alt="Password Icon"
              width={18}
              height={18}
              priority
              style={{ width: 'auto', height: "18px" }}
            />
            <input id="password" name="password" type="password" required className="w-full" />
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
