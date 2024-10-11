import { FC, ReactNode } from 'react'

interface ChatContentProps {
  children: ReactNode
}

const ChatContent: FC<ChatContentProps> = ({ children }) => {
  return (
    <main className="flex flex-col gap-y-5 h-full w-full">{children}</main>
  )
}

export { ChatContent }
