'use client'

import { Chat } from '@/components/app/chat'
import { Dashboard } from '@/components/app/dashboard'
import Rooms from '@/components/app/rooms/rooms'
import { Sidebar } from '@/components/app/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useAttendantWebSocketStore } from '@/stores/attendantStore'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const AttedantChat = () => {
  const {
    isConnected,
    messages,
    username,
    customerServed,
    activeRoom,
    setSendMessage,
    setDisconnectSocket
  } = useAttendantWebSocketStore()
  const router = useRouter()

  useEffect(() => {
    if (!isConnected) {
      router.push('/attendant/sign-in')
    }
  }, [isConnected, router])

  const handleSignOut = () => {
    setDisconnectSocket()
  }

  return (
    <Dashboard.Root>
      <Sidebar.Root>
        <Sidebar.Content>
          <div className="flex flex-col gap-y-2">
            <span>Clients</span>
            <Rooms />
          </div>
        </Sidebar.Content>
        <Sidebar.Footer>
          <div className="flex gap-4">
            <Avatar>
              <AvatarFallback></AvatarFallback>
              <AvatarImage
                src={`${'https://ui-avatars.com/api/?format=svg&background=random&bold=true&font-size=0.33&name='}${username
                  .trim()
                  .replace(' ', '+')}`}
              />
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Attendat</span>
              <span className="text-sm">{username}</span>
            </div>
          </div>
          <Button
            variant="outline"
            className="aspect-square p-0"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </Sidebar.Footer>
      </Sidebar.Root>

      {activeRoom ? (
        <div className="flex flex-1 flex-col gap-4 lg:gap-6">
          <Dashboard.Header>
            <div className="flex gap-4 items-center">
              <Avatar>
                <AvatarFallback></AvatarFallback>
                <AvatarImage
                  src={`${'https://ui-avatars.com/api/?format=svg&background=random&bold=true&font-size=0.33&name='}${customerServed
                    .trim()
                    .replace(' ', '+')}`}
                />
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Client</span>
                <span className="text-xs">{customerServed}</span>
              </div>
            </div>
          </Dashboard.Header>

          <Dashboard.Content>
            <Chat.Content>
              <Chat.Messages messages={messages} username={username} />
              <Chat.TextBox
                isConnected={isConnected}
                setSendMessage={setSendMessage}
              />
            </Chat.Content>
          </Dashboard.Content>
        </div>
      ) : (
        <div
          className="flex flex-1 items-center justify-center"
          x-chunk="dashboard-02-chunk-1"
        >
          <div className="flex flex-1 flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              Customer Service
            </h3>
            <p className="text-sm text-muted-foreground">
              No conversations selected. Go to the left side menu and choose a
              conversation to view it.
            </p>
          </div>
        </div>
      )}
    </Dashboard.Root>
  )
}

export default AttedantChat
