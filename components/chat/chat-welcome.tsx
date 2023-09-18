'use client'
import { Hash } from 'lucide-react'
import React from 'react'

interface ChatWelcomeProps {
  name: string
  type: 'channel' | 'conversation'
}

const ChatWelcome = ({ name, type }: ChatWelcomeProps) => {
  return (
    <div className="mb-4 space-y-2 px-4">
      {type === 'channel' && (
        <div className="flex h-[75px] w-[75px] items-center justify-center rounded-full bg-zinc-500 dark:bg-zinc-700">
          <Hash className="h-12 w-12 text-white" />
        </div>
      )}
      <p className="text-xl font-bold md:text-3xl">
        {type === 'channel' ? 'チャンネル #' : ''}
        {name}
      </p>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {type === 'channel'
          ? `#${name} が開設されました!`
          : `${name} さんと会話を始めましょう!`}
      </p>
    </div>
  )
}

export default ChatWelcome
