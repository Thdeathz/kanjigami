import React from 'react'

type Props = {
  title?: string
  children: React.ReactNode
}

export default function SideSection({ title, children }: Props) {
  return (
    <div className="mt-4 pl-8">
      {title && (
        <div className="mb-2 ml-[-2rem] bg-section-heading py-1 pl-8 text-base font-semibold uppercase leading-[1.125rem] text-sidebar-link opacity-50">
          {title}
        </div>
      )}

      {children}
    </div>
  )
}
