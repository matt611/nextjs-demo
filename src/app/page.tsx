import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <div className="">
        <Image
          className="rounded-2xl mb-8 drop-shadow-[0_0_1.5rem_#FF00FFFF]"
          src='/images/logo.avif'
          alt="Next.js Logo"
          width={400}
          height={400}
          priority
        />
      </div>
      <p className='text-center text-lg text-gray-100'>
        Already have an account?{' '}
        <Link href='/auth/signin' className='font-bold text-purple-400'>
          Sign in
        </Link>
      </p>
    </main>
  );
}
