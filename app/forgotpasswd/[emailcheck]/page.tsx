import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import ResetPasswd from './reset-passwd';

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

  return (
    <div className='grid h-full place-items-center'>
      {/* <div className='p-5 border rounded-md shadow-md w-96'> */}
      <div className='w-96'>
        <h1 className='mb-3 text-2xl font-semibold'>Change Password</h1>
        <div className='text-sm text-gray-500'>
          Hello, <strong>{mbr?.nickname}</strong>
        </div>
        <div className='mb-5 text-sm text-gray-500'>Reset your password</div>
        <ResetPasswd email={mbr.email} emailcheck={emailcheck} />
      </div>
    </div>
  );
}
