// import Image from 'next/image';
// 'use client';
// client 컴포넌트는 async 못씀 (레이아웃 단계 때문에)

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { use } from 'react';
import SignOutButton from '@/components/signout-button';
import { auth } from '@/lib/auth';

export default function My() {
  const session = use(auth());
  if (!session?.user?.name) redirect('/sign');

  const { name, email, image } = session.user;
  return (
    <div className='grid h-full place-items-center'>
      <div className='p-5 text-center border w-96'>
        <h1 className='mb-5 text-lg'>My Page</h1>
        <div className='flex justify-around'>
          <Link href='/api/auth/signout'>Goto SignOut</Link>
          <SignOutButton name={name} />
        </div>
      </div>
    </div>
  );
}
