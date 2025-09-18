import { redirect } from 'next/navigation';
import { findMemberByEmail } from '@/app/sign/sign.action';
import prisma from '@/lib/db';

type Props = {
  params: Promise<{ emailcheck: string }>;
  searchParams: Promise<{ email: string }>;
};
export default async function RegistCheck({ params, searchParams }: Props) {
  const { emailcheck } = await params;
  const { email } = await searchParams;

  const mbr = await findMemberByEmail(email);
  console.log('🐼 ~ mbr:', mbr);
  if (emailcheck !== mbr?.emailcheck)
    redirect('/sign/error?error=InvalidEmailCheck');

  await prisma.member.update({
    where: { email }, // where이 무조건 중요!! 안그러면 모든 유저 전부 update 됨.
    data: { emailcheck: null },
  });

  redirect(`/sign?email=${email}`);
}

// SEO에 무관하기 때문에 use client를 사용해도 되나, 그 경우 Hydration 되는 범위가 넓어져 CPU를 많이 쓰게 되므로 아주 작은 컴포넌트로 쪼개서 넣고, 큰 부분은 되도록 server component로 유지하는 것이 좋음.
