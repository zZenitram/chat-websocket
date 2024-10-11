import { useSocketsGlobal } from '@/hooks/useGlobalSockets'
import { useSocketsAttendant } from '@/hooks/useAttendantSockets'
import { Message, Room } from '@/types/typesSockets'
import { create } from 'zustand'
import { Socket } from 'socket.io-client'

interface AttendantWebSocketState {
  socket: Socket | null
  rooms: Room[]
  messages: Message[]
  username: string
  isConnected: boolean
  customerServed: string
  activeRoom: string

  setJoinRoom: (id: string) => void
  setLeaveRoom: (id: string) => void
  setSendMessage: (message: string) => void
  setDisconnectSocket: () => void
  setConnectSocket: (username: string) => void
  setCustomerServed: (username: string) => void
}

const { onWebSocket } = useSocketsGlobal()
const {
  joinRoom,
  leaveRoom,
  sendMessage,
  onConnect,
  onDisconnect,
  onRooms,
  onMessage,
  onRoomMessages
} = useSocketsAttendant()

export const useAttendantWebSocketStore = create<AttendantWebSocketState>(
  (set, get) => ({
    socket: null,
    rooms: [],
    messages: [],
    username: '',
    customerServed: '',
    isConnected: false,
    activeRoom: '',

    // Conectar ao WebSocket
    setConnectSocket: (username: string) => {
      onWebSocket({
        options: {
          auth: { username, usertype: 'attendant' }
        },
        callback: (socket: Socket) => {
          set({ socket, isConnected: true, username })

          // Evento de conexão
          onConnect({
            socket,
            callback: () => {
              console.log('Conectado com sucesso!')
              set({ isConnected: true })
            }
          })

          // Evento de desconexão
          onDisconnect({
            socket,
            callback: () => {
              console.log('Desconectado com sucesso!')
              set({
                isConnected: false,
                socket: null,
                username: '',
                customerServed: ''
              })
            }
          })

          // Evento de salas
          onRooms({
            socket,
            callback: (rooms: Room[]) => {
              console.log('Retornou as salas disponiveis com sucesso!')
              set({ rooms })
            }
          })

          // Evento de mensagem
          onMessage({
            socket,
            callback: (message: Message) => {
              console.log('Menssagem enviada com sucesso!')
              set((state) => ({ messages: [...state.messages, message] }))
            }
          })

          // Evento de mensagens da sala
          onRoomMessages({
            socket,
            callback: (messages: Message[]) => {
              console.log('Menssagens entregues com sucesso!')
              set({ messages })
            }
          })
        }
      })
    },

    // Enviar mensagem
    setSendMessage: (message: string) => {
      const { socket } = get()
      if (socket) {
        sendMessage({
          socket,
          message
        })
      } else {
        console.error(
          'Unable to send message: No active socket connection found. Please connect to the WebSocket before sending messages.'
        )
      }
    },

    // Entrar em uma sala
    setJoinRoom: (id: string) => {
      const { socket } = get()
      if (socket) {
        joinRoom({
          socket,
          id
        })
        set({ activeRoom: id })
      } else {
        console.error(
          'Unable to join room: No active socket connection found. Please connect to the WebSocket before joining rooms.'
        )
      }
    },

    // Sair de uma sala
    setLeaveRoom: (id: string) => {
      const { socket } = get()
      if (socket) {
        leaveRoom({
          socket,
          id
        })
        set({ activeRoom: '' })
      } else {
        console.error(
          'Unable to leave room: No active socket connection found. Please connect to the WebSocket before leaving rooms.'
        )
      }
    },

    setCustomerServed: (username: string) => {
      set({ customerServed: username })
    },

    // Desconectar do WebSocket
    setDisconnectSocket: () => {
      const { socket } = get()
      if (socket) {
        socket.disconnect()
        set({
          socket: null,
          isConnected: false,
          username: '',
          customerServed: ''
        })
      } else {
        console.warn(
          'No active socket connection to disconnect from. Operation skipped.'
        )
      }
    }
  })
)
