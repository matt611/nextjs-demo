import TopNav from './components/TopNav';
import SideNav from './components/SideNav';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className='box-content bg-gray-200 h-full'>
      <TopNav />
      <div className='flex'>
        <SideNav />
        <div className='flex bg-white rounded-xl w-full text-gray-900 justify-center items-center m-r-2 m-t-2 mb-2'>
          {children}
        </div>
      </div>
    </main>
  );
}