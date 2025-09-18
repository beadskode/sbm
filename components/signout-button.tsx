'use client';

import { useSession } from 'next-auth/react';
import { logout } from '@/app/sign/sign.action';
import { Button } from './ui/button';

export default function SignOutButton() {
  const session = useSession();
  return (
    <Button onClick={logout} variant={'success'}>
      Sign Out {session.data?.user?.name}
    </Button>
  );
}
