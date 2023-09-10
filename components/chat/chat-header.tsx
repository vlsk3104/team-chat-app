import { Hash } from 'lucide-react'
import React from 'react'

import MobileToggle from '../mobile-toggle'

interface ChatHeaderProps {
  serverId: string
  name: string
  type: 'channel' | 'conversation'
  imageUrl?: string
}

const ChatHeader = ({ serverId, name, type, imageUrl }: ChatHeaderProps) => {
  return (
    <div className="text-md flex h-12 items-center border-b-2 border-neutral-200 px-3 font-semibold dark:border-neutral-800">
      <MobileToggle serverId={serverId} />
      {type === 'channel' && (
        <Hash className="ml-2 mr-1 h-5 w-5 text-zinc-500 dark:text-zinc-400" />
      )}
      <p className="text-sm font-semibold text-black dark:text-white">{name}</p>
    </div>
  )
}

export default ChatHeader
