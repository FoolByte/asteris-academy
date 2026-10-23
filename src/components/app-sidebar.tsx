'use client'

import * as React from 'react'

import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar'

import { HugeiconsIcon } from '@hugeicons/react'
import {
  GlobalEducationIcon,
  LayoutDashboardIcon,
  WebDesign01Icon,
} from '@hugeicons/core-free-icons'

import { AppSidebarHeader } from './app-sidebar-header'
import Link from 'next/link'
import { UserProfile } from '@/lib/payload/get-user-profile'

export type SidebarGroupData = {
  groupLabel: string
  items: {
    slug: string
    label: string
    type: string
    group: string
    url: string
  }[]
}

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  items: SidebarGroupData[]
  userProfile: UserProfile | null
}

const icons = [WebDesign01Icon, GlobalEducationIcon]

export function AppSidebar({ items, userProfile, ...props }: AppSidebarProps) {
  const navMain = items.map((group, index) => ({
    title: group.groupLabel,
    url: '#',
    icon: <HugeiconsIcon icon={icons[index % icons.length]} strokeWidth={2} />,
    items: group.items.map((subItem) => ({
      title: subItem.label,
      url: subItem.url,
    })),
  }))

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AppSidebarHeader />
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu className="px-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              className="bg-primary text-primary-foreground hover:bg-secondary"
              render={<Link href="/dashboard" />}
            >
              <HugeiconsIcon icon={LayoutDashboardIcon} strokeWidth={2} />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <NavMain items={navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            name: userProfile?.name ?? 'Pengguna',
            email: userProfile?.email ?? '',
            avatar: userProfile?.avatarUrl ?? null,
            role: userProfile?.role ?? 'editor',
          }}
        />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
