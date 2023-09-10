import { UserButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'

import { ModeToggle } from '../mode-toggle'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'

import NavigationAction from './navigation-action'
import NavigationItem from './navigation-item'

const NavigationSidebar = async () => {
  const profile = await currentProfile()

  if (!profile) {
    redirect('/')
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  return (
    <div className="flex h-full w-full flex-col items-center space-y-4 bg-[#E3E5E8] py-3 text-center text-primary dark:bg-[#1E1F22]">
      <NavigationAction />
      <Separator className="mx-auto h-2 w-10 rounded-md bg-zinc-300 dark:bg-zinc-700" />
      <ScrollArea className="w-full flex-1">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              imageUrl={server.imageUrl}
              name={server.name}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="mt-auto flex flex-col items-center gap-y-4 pb-3">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: 'h-[40px] w-[40px]',
            },
          }}
        />
      </div>
    </div>
  )
}

export default NavigationSidebar
