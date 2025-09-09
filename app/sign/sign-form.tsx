'use client';
import LabelInput from '@/components/label-input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useReducer } from 'react';

export function SignForm() {
  const [isSignin, toggleSign] = useReducer(pre => !pre, false);
  return (
    <>
      {isSignin ? (
        <SignIn toggleSign={toggleSign} />
      ) : (
        <SignUp toggleSign={toggleSign} />
      )}
    </>
  );
}

export function SignIn({ toggleSign }: { toggleSign: () => void }) {
  return (
    <>
      <form className='flex flex-col space-y-3'>
        <LabelInput
          label='email'
          type='email'
          name='email'
          placeholder='email@bookmark.com'
        />
        <LabelInput
          label='password'
          type='password'
          name='passwd'
          placeholder='your password...'
        />

        <div className='flex justify-between'>
          <label htmlFor='remember' className='cursor-pointer'>
            <input
              type='checkbox'
              id='remember'
              className='translate-y-[1px] mr-1'
            />
            Remember me
          </label>
          <Link href='#'>Forgot Password?</Link>
        </div>

        <Button type='submit' variant={'primary'} className='w-full'>
          Sign In
        </Button>
      </form>
      <div className='flex gap-10 mt-5'>
        <span>Don&apos;t have account?</span>
        <Link onClick={toggleSign} href='#'>
          Sign Up
        </Link>
      </div>
    </>
  );
}

export function SignUp({ toggleSign }: { toggleSign: () => void }) {
  return (
    <>
      <form className='flex flex-col space-y-3'>
        <LabelInput
          label='email'
          type='email'
          name='email'
          placeholder='email@bookmark.com'
        />
        <LabelInput
          label='password'
          type='password'
          name='passwd'
          placeholder='your password...'
        />
        <LabelInput
          label='password confirm'
          type='password'
          name='passwd2'
          placeholder='your password...'
        />
        <LabelInput
          label='nickname'
          type='text'
          name='nickname'
          placeholder='Nickname'
        />

        <Button type='submit' variant={'primary'} className='w-full'>
          Sign Up
        </Button>
      </form>
      <div className='flex gap-10 mt-5'>
        <span>Already have account?</span>
        <Link onClick={toggleSign} href='#'>
          Sign In
        </Link>
      </div>
    </>
  );
}
