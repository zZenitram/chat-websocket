'use client'

import Join from '@/components/app/join/join'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { useAttendantWebSocketStore } from '@/stores/attendantStore'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const cardInfo = {
  title: 'Sign In',
  description: 'Access the chat and assist customers who need help.'
}

const AttendantSignIn = () => {
  const { isConnected, setConnectSocket } = useAttendantWebSocketStore()
  const router = useRouter()

  useEffect(() => {
    if (isConnected) {
      router.push('/attendant/chat')
    }
  }, [isConnected, router])

  const handleSuccessRedirect = () => {
    router.push('/attendant/chat')
  }
  
  return (
    <main className="grid place-content-center h-screen w-screen">
      <section className="flex flex-col items-center gap-6">

        <Card className="sm:w-[400px] w-full border-none shadow-none">
          <CardHeader className="py-4">
            <CardTitle className="text-2xl font-semibold">{cardInfo.title}</CardTitle>
            <CardDescription>{cardInfo.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Join
              setConnectSocket={setConnectSocket}
              onSuccess={handleSuccessRedirect}
            />
          </CardContent>
        </Card>

        <Link href="/" className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-700">
          <ArrowLeft className="w-4 h-4" />
          <span>Go back</span>
        </Link>
      </section>
    </main>
  )
}

export default AttendantSignIn
