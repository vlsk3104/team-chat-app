import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

import ChatHeader from '@/components/chat/chat-header'

import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/db'

interface channelIdPageProps {
  params: {
    serverId: string
    channelId: string
  }
}

const ChannelIdPage = async ({ params }: channelIdPageProps) => {
  const profile = await currentProfile()

  if (!profile) {
    return void redirectToSignIn()
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  })

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  })

  if (!channel || !member) {
    redirect('/')
  }

  return (
    <div className="flex h-full flex-col bg-white dark:bg-[#313338]">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
    </div>
  )
}

export default ChannelIdPage
