'use client'

import { useEffect } from 'react'
import { Chat } from '@/components/app/chat/'
import { useClientWebSocketStore } from '@/stores/clientStore'
import { useRouter } from 'next/navigation'

const ClienteChat = () => {
  const { isConnected, messages, username, setSendMessage } = useClientWebSocketStore()
  const router = useRouter()

  useEffect(() => {
    if (!isConnected) {
      router.push('/client/sign-in')
    }
  }, [isConnected, router])

  if (!isConnected) {
    return null
  }

  return (
    <main className="h-screen w-screen bg-slate-50">
      <section className="container flex h-full m-auto lg:px-56">
        <div className="flex-1 h-full border-r border-l p-6 bg-white">
          <Chat.Content>
            <Chat.Messages messages={messages} username={username} />
            <Chat.TextBox
              isConnected={isConnected}
              setSendMessage={setSendMessage}
            />
          </Chat.Content>
        </div>
      </section>
    </main>
  )
}

export default ClienteChat
