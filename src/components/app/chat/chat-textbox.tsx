'use client'

import { KeyboardEvent } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

interface ChatTextBoxProps {
  isConnected: boolean
  setSendMessage: (message: string) => void
}

interface MessageFormValues {
  message: string
}

const ChatTextBox = ({ isConnected, setSendMessage }: ChatTextBoxProps) => {
  const { register, handleSubmit, reset } = useForm<MessageFormValues>()

  const handleSend: SubmitHandler<MessageFormValues> = (data) => {
    if (!data.message.trim()) return
    setSendMessage(data.message)
    reset()
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit(handleSend)()
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSend)} className="flex gap-2 mt-auto">
      <textarea
        className="min-h-[100px] flex-1 p-4 border rounded-sm text-sm resize-none"
        placeholder="Insert message here..."
        aria-label="Message input"
        rows={3}
        maxLength={255}
        {...register('message', { required: true })}
        onKeyDown={handleKeyPress}
        disabled={!isConnected}
      />
      <button
        className="text-sm p-2 rounded bg-zinc-950 text-white h-full disabled:bg-muted disabled:text-muted-foreground disabled:border"
        aria-label="Send message"
        type="submit"
        disabled={!isConnected}
      >
        Enviar
      </button>
    </form>
  )
}

export { ChatTextBox }
