import { redirectLoggedInUser } from "@/utils/redirectLoggedInUser";
import Image from "next/image";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await redirectLoggedInUser();

  return (
    <main className="h-screen flex items-center justify-center p-6 relative">
      <div className="absolute top-0 right-0 -z-10  w-[210px] h-[140px] sm:h-[300px] sm:w-[450px] md:w-[750px] md:h-[500px]">
        <Image
          src="/bg_rt.png"
          alt="Background Right Top Image"
          sizes="100vw"
          fill
          priority
        />
      </div>
      <div className="absolute bottom-0 left-0 -z-10 w-[210px] h-[140px] sm:h-[300px] sm:w-[450px] md:w-[750px] md:h-[500px]">
        <Image
          src="/bg_lb.png"
          alt="Background Left Bottom Image"
          sizes="100vw"
          fill
          priority
        />
      </div>
      {children}
    </main>
  );
}
