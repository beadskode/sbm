'use client';

import { LogOutIcon } from 'lucide-react';
import { logout } from '@/app/sign/sign.action';
import { Button } from './ui/button';

export default function SignOutButton({ name }: { name: string }) {
  return (
    <form action={logout}>
      <Button variant={'success'}>
        <LogOutIcon /> SignOut {name}
      </Button>
    </form>
  );
}
