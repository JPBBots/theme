/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextareaStyle } from '@/theme/components/Textarea.style'
import { Box, Textarea } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import TextareaResizer from 'react-textarea-autosize'

export interface FakeareaProps {
  value: string
  onChange: (val: string) => void
}

export function Fakearea({ value, onChange }: FakeareaProps) {
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    if (!open) setFocused(false)
  }, [open])

  return !open ? (
    <Box
      {...(TextareaStyle.baseStyle! as any)}
      {...(TextareaStyle.variants!.default as any)}
      w="full"
      p={4}
      userSelect="none"
      rounded="md"
      onMouseEnter={() => setOpen(true)}
      textStyle="default"
      whiteSpace="pre-line"
    >
      {value}
    </Box>
  ) : (
    <Textarea
      value={value}
      as={TextareaResizer}
      onChange={({ target }) => {
        onChange(target.value)
      }}
      onBlur={() => setOpen(false)}
      onFocus={() => {
        setFocused(true)
      }}
      onMouseLeave={() => {
        if (focused) return

        setOpen(false)
      }}
    />
  )
}
