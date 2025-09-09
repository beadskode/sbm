'use client';
import Link from 'next/link';
import { useReducer } from 'react';
import LabelInput from '@/components/label-input';
import { Button } from '@/components/ui/button';
import { authorize } from './sign.action';

export function SignForm() {
  const [isSignin, toggleSign] = useReducer(pre => !pre, false);
  return (
    <>
      {isSignin ? (
        <SignUp toggleSign={toggleSign} />
      ) : (
        <SignIn toggleSign={toggleSign} />
      )}
    </>
  );
}

export function SignIn({ toggleSign }: { toggleSign: () => void }) {
  const makeLogin = async (formData: FormData) => {
    // const email = formData.get('email');
    // const passwd = formData.get('passwd'); //* 정석적인 방법, string 뿐만 아니라 file도 올 수 있음
    await authorize(formData);
  };
  return (
    <>
      <form action={makeLogin} className='flex flex-col space-y-3'>
        <LabelInput
          label='email'
          type='email'
          name='email'
          placeholder='email@bookmark.com'
          defaultValue='beads.kode@kakao.com'
        />
        <LabelInput
          label='password'
          type='password'
          name='passwd'
          placeholder='your password...'
          defaultValue='$2b$10$zbmpxOaO4jroF9Mmrt2M8u6TWXms1/ncqJysXXOyD69aYqPaf44jG'
        />

        <div className='flex justify-between'>
          <label htmlFor='remember' className='cursor-pointer'>
            <input
              type='checkbox'
              id='remember'
              className='mr-1 translate-y-[1px]'
            />
            Remember me
          </label>
          <Link href='#'>Forgot Password?</Link>
        </div>

        <Button type='submit' variant={'primary'} className='w-full'>
          Sign In
        </Button>
      </form>
      <div className='mt-5 flex gap-10'>
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
      <div className='mt-5 flex gap-10'>
        <span>Already have account?</span>
        <Link onClick={toggleSign} href='#'>
          Sign In
        </Link>
      </div>
    </>
  );
}
