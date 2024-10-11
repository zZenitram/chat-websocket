import { Socket, SocketOptions } from 'socket.io-client'

export interface WebSocketProps {
  options: SocketOptions
  callback: (socket: Socket) => void
}

export interface OnRoomMessagesProps {
  socket?: Socket | null
  callback: (roomMessages: Message[]) => void
}

export interface OnMessageProps {
  socket?: Socket | null
  callback: (message: Message) => void
}

export interface OnConnectProps {
  socket?: Socket | null
  callback: (success: string) => void
}

export interface OnDisconnectProps {
  socket?: Socket | null
  callback: (success: string) => void
}

export interface onRoomsProps {
  socket?: Socket | null
  callback: (room: Room[]) => void
}

export interface sendMessageProps {
  socket?: Socket | null
  message: String
}

export interface JoinRoom {
  socket?: Socket | null
  id: string
}

export interface LeaveRoom {
  socket?: Socket | null
  id: string
}

export interface Message {
  id: string
  sender: string
  message: string
  hour: string
}

export interface Room {
  id: string
  name: string
  lastMessage: Message
}
