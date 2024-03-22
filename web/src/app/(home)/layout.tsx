import React from 'react'

export default function HomeLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-content p-12">
      <div className="mx-auto max-w-[1600px]">{children}</div>
    </div>
  )
}
