import { Navbar } from '../components/Navbar/Navbar'
import { Sidebar } from '../components/Sidebar/Sidebar'

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='drawer'>
      <input id='left-sidebar-menu' type='checkbox' className='drawer-toggle' />
      <div className='h-screen drawer-content flex flex-col'>
        <Navbar />
        <main className='flex flex-col grow items-center'>
          {children}
        </main>
        <footer className='bg-base-200 p-2 text-center'>Footer</footer>
      </div>
      <Sidebar />
    </div>
  );
}
