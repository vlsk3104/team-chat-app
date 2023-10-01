/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react'
import { Smile } from 'lucide-react'
import { useTheme } from 'next-themes'
import Picker, { Theme } from 'emoji-picker-react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

interface EmojiPickerProps {
  onChange: (value: string) => void
}

const CustomEmojiPicker = ({ onChange }: EmojiPickerProps) => {
  const { resolvedTheme } = useTheme()

  const mapTheme = (theme: string): Theme => {
    switch (theme) {
      case 'dark':
        return Theme.DARK
      case 'light':
        return Theme.LIGHT
      default:
        return Theme.AUTO
    }
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Smile className="text-zinc-500 transition hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300" />
      </PopoverTrigger>
      <PopoverContent
        side="right"
        sideOffset={40}
        className="mb-16 border-none bg-transparent shadow-none drop-shadow-none"
      >
        <Picker
          theme={mapTheme(resolvedTheme!)}
          onEmojiClick={(emojiObject: any) => onChange(emojiObject.emoji)}
        />
      </PopoverContent>
    </Popover>
  )
}

export default CustomEmojiPicker
