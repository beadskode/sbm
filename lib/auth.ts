import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Kakao from 'next-auth/providers/kakao';
import Naver from 'next-auth/providers/naver';
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [Google, Github, Kakao, Naver, Credentials({
    credentials: {
      email: {
        label: 'Email',
        type: 'email',
        placeholder: 'email@bookmark.com'
      },
      password: {
        label: 'Password',
        type: 'password',
        placeholder: 'password ...'
      },
    },
    async authorize(credentials) {
      console.log('🐼 ~ credentials:', credentials)
      return null;
    }
  })],
  callbacks: {
    async signIn({ user, profile }) {
      return true;
    },
    async jwt({ token, user }) {  // jwt 방식, GET /api/auth/callback/google에는 user d없음
      if (user) { 
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // session?.user?.id = token.id;
        // session?.user?.email = token.email;
        // session.user.name = token.name;
      }
      return session;
    },
  },

  trustHost: true, // 포트가 달라도 해결 (cors 해결)
  jwt: { maxAge: 30 * 60 }, // access token 만료 시간
  pages: {
    signIn: '/sign',
    error: '/sign/error'
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET as string,
});
