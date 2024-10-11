import {
  JoinRoom,
  LeaveRoom,
  Message,
  OnConnectProps,
  OnDisconnectProps,
  OnMessageProps,
  OnRoomMessagesProps,
  onRoomsProps,
  Room,
  sendMessageProps
} from '@/types/typesSockets'

const useSocketsAttendant = () => {
  function sendMessage({ socket, message }: sendMessageProps) {
    if (socket) {
      socket.emit('send_message', message)
    } else {
      console.error('Socket not initialized. Unable to send message.')
    }
  }

  function joinRoom({ socket, id }: JoinRoom) {
    if (socket) {
      socket.emit('join_room', id)
    } else {
      console.error('Socket not initialized. Unable to join room.')
    }
  }

  function leaveRoom({ socket, id }: LeaveRoom) {
    if (socket) {
      socket.emit('leave_room', id)
    } else {
      console.error('Socket not initialized. Unable to leave room.')
    }
  }

  function onRooms({ socket, callback }: onRoomsProps) {
    if (socket) {
      socket.off('rooms')
      socket.on('rooms', (rooms: Room[]) => {
        callback(rooms)
      })
    } else {
      console.error('Socket not initialized. Unable to fetch rooms.')
    }
  }

  function onConnect({ socket, callback }: OnConnectProps) {
    if (socket) {
      socket.off('connect')
      socket.on('connect', () => {
        callback('Successfully connected to socket')
      })
    } else {
      console.error('Socket not initialized. Unable to set connect events.')
    }
  }

  function onDisconnect({ socket, callback }: OnDisconnectProps) {
    if (socket) {
      socket.off('disconnect')
      socket.on('disconnect', () => {
        callback('Socket disconnected')
      })
    } else {
      console.error('Socket not initialized. Unable to disconnect.')
    }
  }

  function onMessage({ socket, callback }: OnMessageProps) {
    if (socket) {
      socket.off('receive_message')
      socket.on('receive_message', (message: Message) => {
        console.log('Received message:', message)
        callback(message)
      })
    } else {
      console.error('Socket not initialized. Unable to handle messages.')
    }
  }

  function onRoomMessages({ socket, callback }: OnRoomMessagesProps) {
    if (socket) {
      socket.off('receive_room_messages')
      socket.on('receive_room_messages', (roomMessages: Message[]) => {
        callback(roomMessages)
      })
    } else {
      console.error('Socket not initialized. Unable to handle room messages.')
    }
  }

  return {
    sendMessage,
    joinRoom,
    leaveRoom,
    onRooms,
    onConnect,
    onDisconnect,
    onMessage,
    onRoomMessages
  }
}

export { useSocketsAttendant }
