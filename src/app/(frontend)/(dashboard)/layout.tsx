import React from 'react'
import '../styles.css'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { DashboardHeader } from '@/components/custom/nav/dashboard-header'

import { getSidebarData } from '@/lib/payload/get-sidebar-data'
import { Metadata } from 'next'
import { getUserProfile } from '@/lib/payload/get-user-profile'

export const metadata: Metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function DashboardLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const sidebarItems = await getSidebarData()
  const user = await getUserProfile()

  return (
    <SidebarProvider>
      <AppSidebar items={sidebarItems} userProfile={user} />
      <SidebarInset>
        <DashboardHeader />
        <main className="p-5">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
