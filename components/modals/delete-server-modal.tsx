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

const DeleteServerModal = () => {
  const { isOpen, onClose, type, data } = useModal()

  const router = useRouter()

  const isModalOpen = isOpen && type === 'deleteServer'

  const { server } = data

  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)

      await axios.delete(`/api/servers/${server?.id}`)

      onClose()
      location.href = '/'
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
            チャットルームを削除する
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            本当にこの
            <span className="font-semibold text-indigo-500">
              {server?.name}
            </span>
            を削除しますか？
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
              削除する
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteServerModal
