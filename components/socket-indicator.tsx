'use client'

import React from 'react'

import { useSocket } from './providers/socket-provider'
import { Badge } from './ui/badge'

const SocketIndicator = () => {
  const { isConnected } = useSocket()

  if (!isConnected) {
    return (
      <Badge
        variant={'outline'}
        className="border-none bg-yellow-600 text-white"
      >
        ...接続中
      </Badge>
    )
  }

  return (
    <Badge
      variant={'outline'}
      className="border-none bg-emerald-600 text-white"
    >
      ライブ：リアルタイム
    </Badge>
  )
}

export default SocketIndicator
