import { Navbar } from "../components/Navbar";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <main className="flex flex-col grow items-center">
        {children}
      </main>
      <footer className="bg-base-200 p-2 text-center">Footer</footer>
    </div>
  );
}
