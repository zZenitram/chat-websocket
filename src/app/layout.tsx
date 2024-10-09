import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Chat WebSocket',
  description:
    'Este projeto consiste em uma aplicação de chat em tempo real, desenvolvida utilizando Next.js, que permite que os usuários se conectem e troquem mensagens instantaneamente por meio de WebSockets. O objetivo é proporcionar uma experiência de chat interativa e responsiva, aproveitando as vantagens do Next.js para renderização do lado do servidor e do WebSocket para comunicação em tempo real.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
