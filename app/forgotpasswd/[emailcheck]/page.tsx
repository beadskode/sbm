import { redirect } from 'next/navigation';
import LabelInput from '@/components/label-input';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/db';

// /forgotpasswd/ADFF-SADF-asdf/
export default async function ResetForgotPasswd({
  params,
}: {
  params: Promise<{ emailcheck: string }>;
}) {
  const { emailcheck } = await params;

  const mbr = await prisma.member.findFirst({
    select: { nickname: true, emailcheck: true, email: true },
    where: { emailcheck },
  });

  if (emailcheck !== mbr?.emailcheck)
    redirect('/sign/error?error=InvalidEmailCheck');

  // compare emailcheck and db's emailcheck

  // 어뷰징 방지
  // TODO: compare emailcheck!! (by crypto)
  // if (!mbr) return <h1>Error</h1>;

  const resetPasswd = async (formData: FormData) => {
    //* 과제: useActionState로 & savePasswd
    // 'use server';
    // const passwd = await hash(formData.get('passwd'), 10)
    // await prisma.member.update({
    //   where: {email: mbr.email},
    //   data: {passwd, }
    // })
  };
  return (
    <div className='grid h-full place-items-center'>
      {/* <div className='p-5 border rounded-md shadow-md w-96'> */}
      <div className='w-96'>
        <h1 className='mb-3 font-semibold text-2xl'>Change Password</h1>
        <div className='text-gray-500 text-sm'>Hello, {mbr?.nickname}</div>
        <div className='mb-5 text-gray-500 text-sm'>Reset your password</div>

        <form action={resetPasswd} className=''>
          <LabelInput
            label='new password'
            name='passwd'
            type='password'
            focus={true}
            placeholder='New Password...'
          />
          <LabelInput
            label='new password confirm'
            name='passwd2'
            type='password'
            placeholder='New Password Confirm...'
            className='my-5'
          />
          <Button type='submit' variant={'destructive'} className='my-4 w-full'>
            Change Password
          </Button>
        </form>
      </div>
    </div>
  );
}
