import Link from 'next/link';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className='flex h-screen w-screen items-center justify-center'>
        <div className='z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl'>
          <div className='flex flex-col items-center justify-center border-gray-200 bg-gray-200 pb-2 pt-6 text-center sm:px-16'>
            <Link href='/'>
              <Image
                src='/images/logo.avif'
                priority
                alt='Logo'
                className='h-400 w-400 rounded-xl drop-shadow-[0_0_0.5rem_#FF00FF55]'
                width={400}
                height={400}
              />
            </Link>
          </div>
           {children}
        </div>
      </div>
    </>
  );
}