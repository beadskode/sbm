'use client';
import { LoaderPinwheel } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useActionState, useEffect, useReducer, useRef } from 'react';
import LabelInput from '@/components/label-input';
import { Button } from '@/components/ui/button';
import { authorize, regist } from './sign.action';

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

const storeEmail = (email: string | null) => {
  email === null
    ? localStorage.removeItem('SBM_LOCAL_EMAIL')
    : localStorage.setItem('SBM_LOCAL_EMAIL', email);
};
const readEmail = () => localStorage.getItem('SBM_LOCAL_EMAIL');
export function SignIn({ toggleSign }: { toggleSign: () => void }) {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const emailRef = useRef<HTMLInputElement>(null);
  const passwdRef = useRef<HTMLInputElement>(null);
  const rememberRef = useRef<HTMLInputElement>(null);

  const redirectTo = searchParams.get('redirectTo');
  const [validError, makeLogin, isPending] = useActionState(
    authorize,
    undefined
  );

  const makeLoginAction = (formData: FormData) => {
    rememberMe();

    if (redirectTo) formData.set('redirectTo', redirectTo);
    makeLogin(formData);
  };

  const rememberMe = () => {
    if (rememberRef.current?.checked && emailRef.current?.value)
      storeEmail(emailRef.current.value);
    else storeEmail(null);
  };

  useEffect(() => {
    const storedEmail = readEmail();
    if (rememberRef.current) rememberRef.current.checked = !!storedEmail;
    if (emailRef.current && storedEmail) emailRef.current.value = storedEmail;
    if (email || storedEmail) {
      passwdRef.current?.focus();
    }
  }, [email]); // DOM이 그려졌을 때

  return (
    <>
      <form action={makeLoginAction} className='flex flex-col space-y-3'>
        {/* {redirectTo && (
          <input type='hidden' name='redirectTo' value={redirectTo} />
        )} */}
        <LabelInput
          label='email'
          type='email'
          name='email'
          ref={emailRef}
          error={validError}
          focus={true}
          defaultValue={email || ''}
          placeholder='email@bookmark.com'
        />
        <LabelInput
          label='password'
          type='password'
          name='passwd'
          ref={passwdRef}
          error={validError}
          placeholder='your password...'
        />

        <div className='flex justify-between'>
          <label htmlFor='remember' className='cursor-pointer'>
            <input
              type='checkbox'
              id='remember'
              ref={rememberRef}
              onChange={rememberMe}
              className='mr-1 translate-y-[1px]'
            />
            Remember me
          </label>
          <Link href='/forgotpasswd'>Forgot Password?</Link>
        </div>

        <Button
          type='submit'
          variant={'primary'}
          className='w-full'
          disabled={isPending}
        >
          {isPending ? 'Signing...' : 'Sign In'}
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

// const dummy = {
//   email: 'beadskode+09@gmail.com',
//   passwd: '121212',
//   passwd2: '121212',
//   nickname: '',
// };

export function SignUp({ toggleSign }: { toggleSign: () => void }) {
  const [validError, makeRegist, isPending] = useActionState(regist, undefined); //* 서버로 보내기 / params: action method, 첫번째 인자의 초기값
  return (
    <>
      <form action={makeRegist} className='flex flex-col space-y-3'>
        <LabelInput
          label='email'
          type='email'
          name='email'
          error={validError}
          placeholder='email@bookmark.com'
          // defaultValue={dummy.email}
        />
        <LabelInput
          label='nickname'
          type='text'
          name='nickname'
          error={validError}
          placeholder='Nickname'
          // defaultValue={dummy.nickname}
        />
        <LabelInput
          label='password'
          type='password'
          name='passwd'
          error={validError}
          placeholder='your password...'
          // defaultValue={dummy.passwd}
        />
        <LabelInput
          label='password confirm'
          type='password'
          name='passwd2'
          error={validError}
          placeholder='your password...'
          // defaultValue={dummy.passwd2}
        />

        <Button
          type='submit'
          variant={'primary'}
          className='w-full'
          disabled={isPending}
        >
          {/* {isPending ? 'Signing Up...' : 'Sign Up'} */}
          {isPending && <LoaderPinwheel className='animate-spin' />} Sign Up
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
