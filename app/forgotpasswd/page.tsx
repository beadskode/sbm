import Link from 'next/link';
import LabelInput from '@/components/label-input';
import { Button } from '@/components/ui/button';

export default function ForgotPasswd() {
  const sendResetPasswd = async () => {
    'use server';
  };
  return (
    <div className='grid h-full place-items-center'>
      {/* <div className='p-5 border rounded-md shadow-md w-96'> */}
      <div className='w-96'>
        <h1 className='mb-3 font-semibold text-2xl'>Forgot Password</h1>
        <div className='mb-5 text-gray-500 text-sm'>
          Enter your email address when joined, and send to instructions to
          reset password.
        </div>

        <form action={sendResetPasswd} className=''>
          <LabelInput
            label='email'
            name='email'
            type='email'
            focus={true}
            placeholder='email@bookmark.com'
          />
          <Button type='submit' variant={'success'} className='my-4 w-full'>
            Send Instructions Email
          </Button>
        </form>

        <div className='text-center'>
          Back to <Link href='/sign'>Sign</Link>
        </div>
      </div>
    </div>
  );
}
