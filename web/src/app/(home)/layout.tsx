import React from 'react'

export default function HomeLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="p-12">
      <div className="mx-auto min-h-content max-w-[1600px]">{children}</div>
    </div>
  )
}
