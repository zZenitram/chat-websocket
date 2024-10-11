import {
  Message,
  OnConnectProps,
  OnDisconnectProps,
  OnMessageProps,
  OnRoomMessagesProps,
  sendMessageProps
} from '@/types/typesSockets'

const useSocketsClient = () => {
  function sendMessage({ socket, message }: sendMessageProps) {
    if (socket) {
      socket.emit('send_message', message)
    } else {
      console.error('Socket not initialized. Unable to send message.')
    }
  }

  function onConnect({ socket, callback }: OnConnectProps) {
    if (socket) {
      socket.on('connect', () => {
        callback('Successfully connected to socket')
      })
    } else {
      console.error(
        'Socket not initialized. Unable to set connect/disconnect events.'
      )
    }
  }

  function onDisconnect({ socket, callback }: OnDisconnectProps) {
    if (socket) {
      socket.on('disconnect', () => {
        callback('Socket disconnected')
      })
    } else {
      console.error('Socket not initialized. Unable to disconnect.')
    }
  }

  function onMessage({ socket, callback }: OnMessageProps) {
    if (socket) {
      socket.on('receive_message', (message: Message) => {
        console.log('Received message:', message)
        callback(message)
      })
    } else {
      console.error(
        'Socket not initialized. Unable to handle incoming messages.'
      )
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
    onDisconnect,
    onMessage,
    onConnect,
    onRoomMessages
  }
}

export { useSocketsClient }
