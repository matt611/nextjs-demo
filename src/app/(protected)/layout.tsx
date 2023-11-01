import Link from 'next/link';
import Image from 'next/image';
import TopNav from './components/TopNav';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <TopNav />
      {children}
    </>
  );
}