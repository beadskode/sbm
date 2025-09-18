import { compare } from 'bcryptjs';
import NextAuth, { AuthError } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Kakao from 'next-auth/providers/kakao';
import Naver from 'next-auth/providers/naver';
import z from 'zod';
import { findMemberByEmail } from '@/app/sign/sign.action';
import prisma from './db';
import { validateObject } from './validator';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google,
    Github,
    Kakao,
    Naver,
    Credentials({
      credentials: {
        email: {
          // label: 'Email',
          // type: 'email',
          // placeholder: 'email@bookmark.com', //* 이 부분은 자동생성에 필요한 부분임.
        },
        passwd: {
          // label: 'Password',
          // type: 'password',
          // placeholder: 'password ...' //* 이 부분은 자동생성에 필요한 부분임.
        },
        // action의 name들 중에서 여기에 추가한 프로퍼티만 받음.
      },
      async authorize(credentials) {
        // QQQ: validation check
        const zobj = z.object({
          email: z.email('잘못된 이메일 형식입니다.'),
          passwd: z.string().min(6, 'More than 6 characters.'),
        });
        const [err, data] = validateObject(zobj, credentials);
        if (err) return err;

        return data;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, profile, account }) {
      const isCredential = account?.provider === 'credentials';
      console.log('🐼 ~ account:', account?.provider);
      console.log('🐼 ~ profile:', profile);
      console.log('🐼 ~ user:', user);
      const { email, name: nickname, image, passwd } = user;

      if (!email) return false;

      const mbr = await findMemberByEmail(email, isCredential);
      if (mbr?.emailcheck) {
        return `/sign/error?error=CheckEmail&email=${email}&oldEmailcheck=${mbr.emailcheck}`;
      }

      if (isCredential) {
        if (!mbr) throw authError('Not Exists Member!', 'EmailSignInError');
        if (mbr.outdt) throw authError('Withdrawed Member!', 'AccessDenied'); // 탈퇴한 경우
        if (!mbr.passwd) throw authError('SNS User!', 'OAuthAccountNotLinked'); // SNS 로그인인 경우 SNS로 돌아가라고 요청

        // 암호 비교 (compare) => 실패 시 오류, 성공 시 로그인
        const isValidPasswd = await compare(passwd ?? '', mbr.passwd);
        if (!isValidPasswd)
          throw authError('Invalid Password!', 'CredentialsSignin');
      } else {
        //* SNS 자동가입!
        if (!mbr && nickname) {
          await prisma.member.create({
            data: { email, nickname, image },
          });
        }
      }

      return true;
    },
    async jwt({ token, user, trigger, account, session }) {
      // 여기서 session 이 Any인 건 Next에서 주는 것
      console.log('🐼 ~ account:', account);
      // jwt 방식, GET /api/auth/callback/google에는 user 없음
      // const isUpdate = trigger === 'update'; // DB 업데이트 이후 사용자의 쿠키와 세션을 바꿈
      const userData = trigger === 'update' ? session : user;
      if (userData) {
        token.id = userData.id;
        token.email = userData.email;
        token.name = userData.name || userData.nickname;
        token.image = userData.image;
        token.isadmin = userData.isadmin;
      } // 주는 값대로 토큰이 생성되므로 모든 값들이 다 Unknown
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id?.toString() || '';
        session.user.email = token.email as string;
        session.user.name = token.name;
        session.user.image = token.image as string;
        session.user.isadmin = token.isadmin;
      }
      return session;
    },
  },

  trustHost: true, // 포트가 달라도 해결 (cors 해결)
  jwt: { maxAge: 30 * 60 }, // access token 만료 시간
  pages: {
    signIn: '/sign',
    error: '/sign/error', // next-auth에서 발생한 에러일 때 이동
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET as string,
});

function authError(message: string, type: AuthError['type']) {
  const authError = new AuthError(message);
  authError.type = type;
  return authError;
}
