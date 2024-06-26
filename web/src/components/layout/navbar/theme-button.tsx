'use client'

import { useTheme } from 'next-themes'
import { BsMoonFill, BsSunFill } from 'react-icons/bs'

import { Button } from '@/components/ui/button'

export default function ThemeButton() {
  const { theme, setTheme } = useTheme()

  const onToggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return (
    <Button
      className="text-xl"
      shape="circle"
      onClick={onToggleTheme}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? <BsMoonFill /> : <BsSunFill />}
    </Button>
  )
}
