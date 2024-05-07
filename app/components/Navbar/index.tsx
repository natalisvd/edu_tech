import Link from "next/link";
import { LogoutButton } from "../LogoutButton/LogoutButton";

export const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-md dark:border-b border-base-200">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost text-xl">
          Edu Tech
        </Link>
      </div>
      <div className="flex-none me-3">
        <LogoutButton />
      </div>
    </div>
  );
};
