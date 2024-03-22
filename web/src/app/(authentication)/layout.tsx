import React from 'react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-center relative min-h-content">
      <div className="z-[1]">{children}</div>
      <div className="absolute bottom-0 left-0 h-[8rem] w-full bg-auth-bottom bg-contain bg-bottom bg-repeat-x opacity-50 bg-blend-screen before:absolute before:left-0 before:h-full before:w-[12rem] before:bg-auth-blur-l after:absolute after:left-auto after:right-0 after:h-full after:w-[12rem] after:bg-auth-blur-r" />
    </div>
  )
}
