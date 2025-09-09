// import Image from 'next/image';
import { GithubLoginButton } from './github-login-button';
import { GoogleLoginButton } from './google-login-button';
import { KakaoLoginButton } from './kakao-login-button';
import { NaverLoginButton } from './naver-login-button';
import { SignForm } from './sign-form';

export default function Sign() {
  return (
    <div className='grid h-full px-10 place-items-center'>
      <div className='flex [&>div]:p-4 rounded-lg shadow-md border overflow-hidden w-full'>
        <div className='flex-1'>
          <div className='flex items-center gap-5'>
            <h1 className='text-2xl'>Book & Mark</h1>
            <span className='text-gray-500'>Sign with</span>
          </div>
          <div className='grid grid-cols-2 gap-3 mt-5 mb-2'>
            <GoogleLoginButton />
            <GithubLoginButton />
            <NaverLoginButton />
            <KakaoLoginButton />
          </div>
          <div className='text-center relative text-gray-600 before:content-[""] before:absolute before:left-0 before:top-[50%] before:bg-gray-200 before:h-[1px] before:w-[45%] after:content-[""] after:absolute after:right-0 after:top-[50%] after:bg-gray-200 after:h-[1px] after:w-[45%]'>
            or
          </div>
          <SignForm />
        </div>

        <div className='flex-1 text-white bg-green-500'></div>
      </div>
    </div>
  );
}
