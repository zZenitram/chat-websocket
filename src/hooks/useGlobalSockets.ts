import { WebSocketProps } from '@/types/typesSockets'
import { io } from 'socket.io-client'

const useSocketsGlobal = () => {
  function onWebSocket({ options, callback }: WebSocketProps) {
    const websocketHost = `${process.env.NEXT_PUBLIC_WEBSOCKET_HOST}/chat`
    const socket = io(websocketHost, options)
    callback(socket)
  }

  return {
    onWebSocket
  }
}

export { useSocketsGlobal }
