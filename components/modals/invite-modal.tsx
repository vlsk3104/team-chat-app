/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'

import axios from 'axios'
import { Check, Copy, RefreshCcw } from 'lucide-react'
import { useState } from 'react'

import { useModal } from '@/hooks/use-modal-store'
import { useOrigin } from '@/hooks/use-origin'

import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

const InviteModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal()

  const origin = useOrigin()

  const isModalOpen = isOpen && type === 'invite'

  const { server } = data

  const [copied, setCopied] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`

  const onCopy = () => {
    void navigator.clipboard.writeText(inviteUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 1000)
  }

  const onNew = async () => {
    try {
      setIsLoading(true)
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`,
      )

      onOpen('invite', { server: response?.data })
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
            友人を招待する
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="text-xs font-bold text-zinc-500 dark:text-secondary/70">
            チャットルーム 招待リンク
          </Label>
          <div className="mt-2 flex items-center gap-x-2">
            <Input
              disabled={isLoading}
              className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
              value={inviteUrl}
              onChange={() => {}}
            />
            <Button disabled={isLoading} onClick={onCopy} size={'icon'}>
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Button
            onClick={onNew}
            disabled={isLoading}
            variant={'link'}
            size={'sm'}
            className="mt-4 text-xs text-zinc-500"
          >
            新しく招待リンクを生成する
            <RefreshCcw className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default InviteModal
