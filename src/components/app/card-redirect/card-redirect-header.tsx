import { CardTitle } from '@/components/ui/card'
import { FC, ReactNode } from 'react'

interface CardRedirectHeaderProps {
  children: ReactNode
}

const CardRedirectHeader: FC<CardRedirectHeaderProps> = ({ children }) => {
  return (
    <CardTitle className="flex items-center gap-3 mb-2">{children}</CardTitle>
  )
}

export default CardRedirectHeader
