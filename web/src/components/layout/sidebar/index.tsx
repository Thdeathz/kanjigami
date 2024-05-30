import React from 'react'

import SidebarContent from '@/components/layout/sidebar/sidebar-content'
import { getCurrentUserInfo } from '@/server/actions/user'

export default async function Sidebar() {
  const currentUser = await getCurrentUserInfo()

  return <SidebarContent currentUser={currentUser} />
}
