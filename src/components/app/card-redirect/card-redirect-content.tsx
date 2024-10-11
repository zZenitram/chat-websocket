import { CardDescription } from '@/components/ui/card'
import { FC, ReactNode } from 'react'

interface CardRedirectContentProps {
  children: ReactNode
}

const CardRedirectContent: FC<CardRedirectContentProps> = ({ children }) => {
  return (
    <CardDescription className="text-sm text-gray-600">
      {children}
    </CardDescription>
  )
}

export default CardRedirectContent
