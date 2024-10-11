import { useSocketsGlobal } from '@/hooks/useGlobalSockets'
import { useSocketsClient } from '@/hooks/useClientSockets'
import { Message } from '@/types/typesSockets'
import { create } from 'zustand'
import { Socket } from 'socket.io-client'

interface ClientWebSocketState {
  socket: Socket | null
  messages: Message[]
  username: string
  isConnected: boolean

  setDisconnectSocket: () => void
  setSendMessage: (message: string) => void
  setConnectSocket: (username: string) => void
}

const { onWebSocket } = useSocketsGlobal()
const { sendMessage, onConnect, onDisconnect, onMessage, onRoomMessages } =
  useSocketsClient()

export const useClientWebSocketStore = create<ClientWebSocketState>(
  (set, get) => ({
    socket: null,
    messages: [],
    username: '',
    isConnected: false,

    // Conectar ao WebSocket
    setConnectSocket: (username: string) => {
      onWebSocket({
        options: {
          auth: { username, usertype: 'client' }
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
              set({ isConnected: false, socket: null, username: '' })
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

    // Desconectar do WebSocket
    setDisconnectSocket: () => {
      const { socket } = get()
      if (socket) {
        socket.disconnect()
        set({ socket: null, isConnected: false, username: '' })
      } else {
        console.warn(
          'No active socket connection to disconnect from. Operation skipped.'
        )
      }
    }
  })
)
