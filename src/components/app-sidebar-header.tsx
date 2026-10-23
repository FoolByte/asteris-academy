'use client'

import * as React from 'react'
import Link from 'next/link'
import { HugeiconsIcon } from '@hugeicons/react'
import { UniversityIcon } from '@hugeicons/core-free-icons'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Image from 'next/image'

export function AppSidebarHeader() {
  // true = hover overlay ditahan sampai kursor keluar dari area header
  const [suppressHover, setSuppressHover] = React.useState(false)

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div
          className="group/logo relative flex items-center gap-1"
          data-suppress={suppressHover}
          onMouseLeave={() => setSuppressHover(false)}
        >
          {/* Logo + nama, link ke /dashboard */}
          <SidebarMenuButton
            size="lg"
            render={<Link href="/dashboard" />}
            className="h-auto min-h-14"
          >
            <Avatar className="size-8 shrink-0 rounded-lg">
              <AvatarImage
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE58iU3Qk8wnAEv5CUqywbWM9J2rIhSp4X-RGJWspuvDjsapqUWXrSFqtr&s=10"
                alt="Sekolah Tinggi Teknologi"
              />
              <AvatarFallback className="rounded-lg">STT</AvatarFallback>
            </Avatar>

            <div className="grid min-w-0 flex-1 text-left leading-tight">
              <span className="truncate font-semibold">Sekolah Tinggi Teknologi</span>
              <span className="truncate text-xs text-muted-foreground">
                Unggul, Inovatif, dan Berteknologi
              </span>
            </div>
          </SidebarMenuButton>

          {/* Trigger kanan: hilang saat collapsed */}
          <SidebarTrigger
            className="text-muted-foreground group-data-[collapsible=icon]:hidden"
            onClick={() => setSuppressHover(true)}
          />

          {/* Trigger menimpa logo: hanya saat collapsed, muncul saat hover */}
          <SidebarTrigger
            className="absolute top-3 left-0 hidden size-8 border bg-sidebar opacity-0 transition-opacity group-hover/logo:opacity-100 group-data-[suppress=true]/logo:pointer-events-none group-data-[suppress=true]/logo:opacity-0 group-data-[collapsible=icon]:flex"
            onClick={() => setSuppressHover(true)}
          />
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
