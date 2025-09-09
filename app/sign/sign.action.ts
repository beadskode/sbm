// server action
'use server';

import { signOut } from "@/lib/auth";
import { signIn } from 'next-auth/react';

type Provider = 'google' | 'github' | 'naver' | 'kakao';

export const login = async (provider: Provider, callback?: string) => {
  await signIn(provider, { redirectTo: callback || '/bookcase' });
};

export const logout = async () => {
  await signOut({ redirectTo: '/' });
}