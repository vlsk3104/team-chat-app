'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useModal } from '@/hooks/use-modal-store'

import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'

const LeaveServerModal = () => {
  const { isOpen, onClose, type, data } = useModal()

  const router = useRouter()

  const isModalOpen = isOpen && type === 'leaveServer'

  const { server } = data

  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)

      await axios.patch(`/api/servers/${server?.id}/leave`)

      onClose()

      router.refresh()
      router.push('/')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            チャットルームを退出する
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            本当にこの
            <span className="font-semibold text-indigo-500">
              {server?.name}
            </span>
            を退出しますか？
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex w-full items-center justify-between">
            <Button disabled={isLoading} onClick={onClose} variant={'ghost'}>
              キャンセル
            </Button>
            <Button
              disabled={isLoading}
              variant={'primary'}
              onClick={() => void onClick()}
            >
              退出する
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default LeaveServerModal
