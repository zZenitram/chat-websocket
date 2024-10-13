'use client'

import { Send } from 'lucide-react'
import { FC, useState } from 'react'

type Message = {
  id: number
  sender: string
  message: string
  hour: string
}

const Chat: FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'Joe Doe', message: 'Olá', hour: '4:50 PM' },
  ])

  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMessageObject: Message = {
        id: messages.length + 1,
        sender: 'Você',
        message: newMessage,
        hour: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }

      setMessages((prevMessages) => [...prevMessages, newMessageObject])
      setNewMessage('')
    }
  }

  return (
    <main className="flex h-screen w-full justify-center">
      <section className="container flex flex-col gap-5 p-5 lg:px-60">
        <ul className="flex-1 space-y-4 rounded-md">
          {messages.map((data) => (
            <li
              key={data.id}
              className={`w-auto ${data.sender === 'Você' ? 'text-end' : 'text-start'}`}
            >
              <article
                aria-label={`data from ${data.sender}`}
                className="space-y-1"
              >
                <span className="text-xs text-zinc-500">{data.sender}</span>
                <p
                  className={`w-max rounded-md border px-2 py-1 text-sm ${data.sender === 'Você' ? 'ms-auto bg-white' : 'me-auto border-emerald-100 bg-emerald-50'}`}
                >
                  {data.message}
                </p>
                <span className="text-xs text-zinc-400">{data.hour}</span>
              </article>
            </li>
          ))}
        </ul>

        <nav
          className="flex w-full flex-col gap-2 rounded-md border p-2"
          role="navigation"
          aria-label="Message input"
        >
          <textarea
            className="flex-1 resize-none text-sm outline-none"
            name="message"
            id="chat-message"
            placeholder="Escreva sua mensagem aqui..."
            maxLength={255}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            aria-label="Message input field"
          ></textarea>
          <button
            className="ms-auto grid h-8 w-8 place-content-center rounded-md bg-zinc-950"
            onClick={handleSendMessage}
            aria-label="Send message"
          >
            <Send className="h-4 w-4 stroke-white" />
          </button>
        </nav>
      </section>
    </main>
  )
}

export default Chat
