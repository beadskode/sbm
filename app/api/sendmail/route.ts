import { type NextRequest, NextResponse } from 'next/server';
import { sendPasswordReset, sendRegistCheck } from '@/app/sign/mail.action';

type sendMailBody = {
  email: string;
  emailcheck: string;
  nickname?: string;
  emailType?: 'regist' | 'reset';
};

// POST /api/sendmail
export async function POST(req: NextRequest) {
  const {
    email,
    emailcheck,
    nickname,
    emailType = 'regist',
  }: sendMailBody = await req.json();

  const authorization = req.headers.get('authorization');
  if (authorization !== `Bearer ${process.env.INTERNAL_SECRET}`)
    throw new Error('InvalidToken');

  const rs =
    emailType === 'regist'
      ? await sendRegistCheck(email, emailcheck)
      : await sendPasswordReset(email, emailcheck, nickname);

  return NextResponse.json(rs); // 아무나 fetch하지 않기 위해 보안 키가 있어야 함.
}
