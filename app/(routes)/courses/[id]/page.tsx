"use client";

// import { useRouter } from "next/router";

import { usePathname } from "next/navigation";

const Page = () => {
  const pathname = usePathname();
  console.log(pathname);
  return <div>Page </div>;
};

export default Page;
