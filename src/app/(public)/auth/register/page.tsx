'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingDots from '@/app/components/loading/loading-dots';
import { useSession } from 'next-auth/react';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // go to dashboard if they are already signed in
  const { data: session } =  useSession();
  if (session) router.push('/');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        const result = fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: e.currentTarget.email.value,
            fullname: e.currentTarget.fullname.value,
            username: e.currentTarget.username.value,
            password: e.currentTarget.password.value,
          }),
        }).then(async (res) => {
          if (res.status === 200) {
            setSuccess('Account created! Redirecting to login...');
            setTimeout(() => {
              setLoading(false);
              router.push('/auth/signin');
            }, 2000);
          } else {
            const { error } = await res.json();
            setError(error);
            setLoading(false);
          }
        }).catch((reason) => {
          setError('submission error');
          setLoading(false);
        });
      }}
      className='flex flex-col space-y-4 bg-gray-200 px-4 py-8 sm:px-16'
    >
      <div>
        {success && <p className='text-green-500 pb-4 font-bold uppercase'>{success}</p>}
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
          htmlFor='fullname'
          className='block text-xs text-gray-600 uppercase'
        >
          Full Name
        </label>
        <input
          id='fullname'
          name='fullname'
          type='text'
          required
          className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm'
        />
      </div>
      <div>
        <label
          htmlFor='username'
          className='block text-xs text-gray-600 uppercase'
        >
          Username
        </label>
        <input
          id='username'
          name='username'
          type='text'
          required
          className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm'
        />
      </div>
      <div>
        <label
          htmlFor='password'
          className='block text-xs text-gray-800 uppercase'
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
          <p>Sign up</p>
        )}
      </button>
      <p className='text-center text-sm text-gray-600'>
        Already have an account?{' '}
        <Link href='/auth/signin' className='font-bold text-fuchsia-700'>
          Sign in
        </Link>{' '}
        instead.
      </p>
    </form>
  );
}
