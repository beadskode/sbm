'use client';

import { logout } from "@/app/sign/sign.action";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";

export default function SignOutButton() {
  const session = useSession();
  if (!session?.data?.user) redirect('/') // session이 없는 상태이면 signout 주소 쳐서 들어왔을 때 리다이렉트
  return (
    <Button onClick={logout} variant={'success'}>Sign Out {session.data?.user?.name}</Button>
  );
}