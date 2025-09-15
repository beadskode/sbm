import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: '*.googleusercontent.com' },
      { hostname: 'avatars.githubusercontent.com' },
      { hostname: 'phinf.pstatic.net' },
      { hostname: '*.kakaocdn.net' },
      { hostname: 'localhost' },
    ],
  },
};

export default nextConfig;
