'use client'; // 클라이언트 컴포넌트는 훅을 쓸 수 있다.
import { MonitorIcon, MoonStar, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const THEMES = ['light', 'system', 'dark'] as const;
const THEME_ICONS = {
  light: <MonitorIcon />,
  system: <MoonStar />,
  dark: <SunIcon />,
};

export default function ThemeChanger() {
  const { theme, setTheme } = useTheme();
console.log(theme)
  // 테마로 인한 hydration 에러 방지 //
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount || !theme) return <button></button>;

  const changeTheme = () => {
    const idx = THEMES.indexOf(theme as keyof typeof THEME_ICONS) + 1;
    setTheme(THEMES[idx % THEMES.length]);
  };

  return (
    <button onClick={changeTheme} className='btn-icon'>
      {THEME_ICONS[theme as keyof typeof THEME_ICONS]}
    </button>
  );
}
