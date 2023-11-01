'use client';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingDots from '@/app/components/loading/loading-dots';

function Signin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // go to dashboard if they are already signed in
  const { data: session } =  useSession();
  if (session) router.push('/dashboard');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        signIn('credentials', {
          redirect: false,
          email: e.currentTarget.email.value,
          password: e.currentTarget.password.value,
          // @ts-ignore
        }).then(({ error }) => {
          if (error) {
            setLoading(false);
            setError(error);
          } else {
            router.refresh();
            router.push('/');
          }
        });
      }}
      className='flex flex-col space-y-4 bg-gray-200 px-4 py-8 sm:px-16'
    >
      <div>
        {error && <p className='text-red-500 pb-4 font-bold uppercase'>{error}</p>}
        <label
          htmlFor='email'
          className='block text-xs text-gray-600 uppercase'
        >
          Email Address
        </label>
        <input
          id='email'
          name='email'
          type='email'
          placeholder='panic@thedis.co'
          autoComplete='email'
          required
          className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm'
        />
      </div>
      <div>
        <label
          htmlFor='password'
          className='block text-xs text-gray-600 uppercase'
        >
          Password
        </label>
        <input
          id='password'
          name='password'
          type='password'
          required
          className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm'
        />
      </div>
      <button
        disabled={loading}
        className={`${
          loading
            ? 'cursor-not-allowed border-gray-200 bg-gray-100'
            : 'border-gray-200 bg-fuchsia-700 text-white hover:bg-fuchsia-500'
        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {loading ? (
          <LoadingDots color='#808080' />
        ) : (
          <p>Sign In</p>
        )}
      </button>
      <p className='text-center text-sm text-gray-600'>
        Don&apos;t have an account?{' '}
        <Link href='/auth/register' className='font-bold text-fuchsia-700'>
          Register
        </Link>{' '}
        for free.
      </p>
    </form>
  );
}

export default Signin;