'use client'

import '@livekit/components-styles'
import { LiveKitRoom, VideoConference } from '@livekit/components-react'
import { useUser } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface MediaRoomProps {
  chatId: string
  audio: boolean
  video: boolean
}

const MediaRoom = ({ chatId, audio, video }: MediaRoomProps) => {
  const { user } = useUser()
  const [token, setToken] = useState('')

  useEffect(() => {
    const name = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`
    ;(async () => {
      try {
        const resp = await fetch(`/api/livekit?room=${chatId}&username=${name}`)
        const data = await resp.json()
        setToken(data.token)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [user?.firstName, user?.lastName, chatId])

  if (token === '') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <Loader2 className="my-4 h-7 w-7 animate-spin text-zinc-500" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    )
  }

  return (
    <LiveKitRoom
      video={video}
      audio={audio}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      data-lk-theme="default"
    >
      <VideoConference />
    </LiveKitRoom>
  )
}

export default MediaRoom
