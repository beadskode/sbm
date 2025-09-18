import { Link } from 'lucide-react';
import { use } from 'react';
import { Button } from '@/components/ui/button';

type Props = {
  searchParams: Promise<{ error: string; email?: string; emailcheck?: string }>;
};

const getMessage = (error: string) => {
  if (error === 'InvalidEmailCheck') return 'Invalid Email Authorization';
  if (error === 'CheckEmail') return 'Check Your Email, Plz!';
};
export default function AuthError({ searchParams }: Props) {
  const { error, email, emailcheck } = use(searchParams);
  return (
    <div className='grid h-full place-items-center'>
      <div className='text-center'>
        <h1 className='mb-5 font-semibold text-2xl'>{error}</h1>
        <div className='mb-2 text-red-500'>{getMessage(error)}</div>
        {/* <Link href={`/sign?email=${email}`}>Go to Login</Link> */}
        <div className='flex justify-center gap-2'>
          <Button variant={'outline'} asChild={true}>
            {/* asChild로 자식 컴포넌트에 기능 위임 */}
            <Link href={`/sign?email=${email}`}>Go to Login</Link>
          </Button>
          {error === 'CheckEmail' && emailcheck && (
            <Button variant={'primary'}>Resend email to {email}</Button>
          )}
        </div>
      </div>
    </div>
  );
}
