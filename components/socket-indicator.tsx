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
        1秒ごとにポーリングで接続します
      </Badge>
    )
  }

  return (
    <Badge
      variant={'outline'}
      className="border-none bg-emerald-600 text-white"
    >
      ライブ：リアルタイム更新
    </Badge>
  )
}

export default SocketIndicator
