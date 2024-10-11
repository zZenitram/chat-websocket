'use client'
import { Message } from '@/types/typesSockets'
import { Fragment, useEffect, useRef } from 'react'

interface ChatMessagesProps {
  messages: Message[]
  username: string
}

const ChatMessages = ({ messages, username }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLUListElement | null>(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const isSameSenderAndMinute = (currentMessage: Message, previousMessage?: Message) => {
    if (!previousMessage) return false
    return (
      currentMessage.sender === previousMessage.sender &&
      currentMessage.hour === previousMessage.hour
    )
  }

  return (
    <ul
      ref={messagesEndRef}
      className="flex flex-1 flex-col gap-1 rounded-sm overflow-y-auto"
    >
      {messages?.map((message, index) => {
        const previousMessage = messages[index - 1]
        const nextMessage = messages[index + 1]
        const showSender = !isSameSenderAndMinute(message, previousMessage)
        const showTime = !isSameSenderAndMinute(message, nextMessage)
        
        const messageClass =
          message.sender === username ? 'ml-auto border' : 'mr-auto bg-emerald-50'
        const alignmentClass = message.sender === username ? 'text-end' : 'text-start'

        return (
          <Fragment key={message.id}>
            <li className={`${alignmentClass}`}>
              {showSender && <span className="text-xs">{message.sender}</span>}
              <p
                className={`${messageClass} w-max p-1.5 px-3 text-sm rounded-sm max-w-[300px]`}
                aria-label={`Message from ${message.sender}`}
              >
                {message.message}
              </p>
              {showTime && <span className="text-xs">{message.hour}</span>}
            </li>
          </Fragment>
        )
      })}
    </ul>
  )
}

export { ChatMessages }
