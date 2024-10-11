'use client'

import clsx from 'clsx'
import { useState, useCallback } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAttendantWebSocketStore } from '@/stores/attendantStore'
import { Room } from '@/types/typesSockets'

const Rooms = () => {
  const { rooms, activeRoom, setJoinRoom, setLeaveRoom, setCustomerServed } =
    useAttendantWebSocketStore()
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null)

  const handleRoomClick = useCallback(
    (room: Room) => {
      const newSelectedRoomId = selectedRoomId === room.id ? null : room.id
      setCustomerServed(room.name)

      if (activeRoom) {
        setLeaveRoom(activeRoom)
      }

      if (newSelectedRoomId) {
        setJoinRoom(newSelectedRoomId)
      }

      setSelectedRoomId(newSelectedRoomId)
    },
    [activeRoom, selectedRoomId, setCustomerServed, setJoinRoom, setLeaveRoom]
  )

  return (
    <nav className="flex flex-col gap-y-3 h-full w-full">
      {rooms.length > 0 ? (
        rooms.map((room) => {
          const roomName = room.name || 'Unknown Room'
          const isSelected = selectedRoomId === room.id

          return (
            <button
              key={room.id}
              onClick={() => handleRoomClick(room)}
              className={clsx(
                'flex items-center gap-x-3 p-3 border rounded-md transition-colors',
                isSelected ? 'bg-zinc-950 text-white' : 'hover:bg-zinc-100'
              )}
              aria-pressed={isSelected}
              aria-label={`Room ${roomName}`}
            >
              <Avatar>
                <AvatarFallback />
                <AvatarImage
                  src={`https://ui-avatars.com/api/?format=svg&background=random&bold=true&font-size=0.33&name=${encodeURIComponent(
                    room.name.trim()
                  )}`}
                />
              </Avatar>
              <div className="flex flex-col gap-1 w-full">
                <span className="text-start text-sm">{roomName}</span>
                <p
                  className={clsx(
                    'text-start text-xs truncate sm:w-[90px] lg:w-[200px]',
                    isSelected ? 'text-zinc-300' : 'text-muted-foreground'
                  )}
                  style={{}}
                >
                  {room.lastMessage?.message || 'No recent messages'}
                </p>
              </div>
            </button>
          )
        })
      ) : (
        <p className="p-4 text-center text-gray-500">No rooms available.</p>
      )}
    </nav>
  )
}

export default Rooms
