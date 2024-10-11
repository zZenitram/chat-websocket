import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { FC, ReactNode } from 'react'

interface CardRedirectRootProps {
  children: ReactNode
  href: string
}

const CardRedirectRoot: FC<CardRedirectRootProps> = ({ children, href }) => {
  return (
    <Link href={href}>
      <Card className="flex flex-col justify-between w-[225px] h-[250px] p-2 shadow-none hover:shadow-lg transition-shadow duration-200 border border-gray-200">
        <CardHeader>{children}</CardHeader>
        <CardFooter className='justify-end gap-x-2'>
          <span className="text-sm font-bold underline underline-offset-4 text-zinc-950 hover:text-blue-800">
            Click here
          </span>
          <ArrowRight className="w-4 h-4 text-zinc-950" />
        </CardFooter>
      </Card>
    </Link>
  )
}

export default CardRedirectRoot
