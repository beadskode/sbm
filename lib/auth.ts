import NextAuth, { AuthError, type User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Kakao from 'next-auth/providers/kakao';
import Naver from 'next-auth/providers/naver';
import z from 'zod';

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

        console.log('🐼 ~ credentials:', credentials);
        const { email, passwd } = credentials;
        // const { email, passwd } = Object.fromEntries(formData.entries());
        const validator = z
          .object({
            email: z.email('잘못된 이메일 형식입니다.'),
            passwd: z.string().min(6, 'More than 6 characters.'),
          })
          .safeParse({ email, passwd });
        if (!validator.success) {
          console.log(`Error: ${validator.error}`);
          throw new AuthError(validator.error.message);
        }

        return { email, passwd } as User;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, profile, account }) {
      const isCredential = account?.provider === 'credentials';
      console.log('🐼 ~ account:', account?.provider);
      console.log('🐼 ~ profile:', profile);
      console.log('🐼 ~ user:', user);
      const { email, name: nickname, image } = user;
      if (!email) return false;
      const mbr = await prisma.member.findUnique({ where: { email } });
      if (isCredential) {
        if (!mbr) throw new AuthError('NotExistMember');
        // 암호 비교 (compare) => 실패 시 오류, 성공 시 로그인
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
      console.log('🐼 ~ account:', account);
      // jwt 방식, GET /api/auth/callback/google에는 user 없음
      // const isUpdate = trigger === 'update'; // DB 업데이트 이후 사용자의 쿠키와 세션을 바꿈
      const userData = trigger === 'update' ? session : user;
      if (userData) {
        token.id = userData.id;
        token.email = userData.email;
        token.name = userData.name || userData.nickname;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id?.toString() || '';
        session.user.email = token.email as string;
        session.user.name = token.name;
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
