// import Image from 'next/image';
// 'use client';
// client 컴포넌트는 async 못씀 (레이아웃 단계 때문에)

import SignOutButton from "@/components/signout-button";
import Link from "next/link";

export default function My() {
  return (
    <div className="grid h-full place-items-center">
      <div className="p-5 text-center border w-96">
        <h1 className="mb-5 text-lg">My Page</h1>
        <div className="flex justify-around">
          <Link href='/api/auth/signout'>Goto SignOut</Link>
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
