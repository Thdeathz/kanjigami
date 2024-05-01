import React from 'react'

import SidebarContent from '@/components/layout/sidebar/sidebar-content'
import { auth } from '@/server/auth'

export default async function Sidebar() {
  const session = await auth()

  return <SidebarContent session={session} />
}
