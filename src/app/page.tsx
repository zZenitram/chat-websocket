import { CardRedirect } from '@/components/app/card-redirect'
import { User, UserCog } from 'lucide-react'

interface TypesUsersProps {
  id: string
  icon: JSX.Element
  title: string
  description: string
  link: string
}

const Home = () => {
  const typesUsers: TypesUsersProps[] = [
    {
      id: 'UserClient',
      icon: <User />,
      title: 'User Client',
      description:
        'Click to access the client interface, where you can explore all available features.',
      link: '/client/sign-in'
    },
    {
      id: 'UserAttendant',
      icon: <UserCog />,
      title: 'User Attendant',
      description:
        'Click to access the attendant interface and manage client requests efficiently.',
      link: '/attendant/sign-in'
    }
  ]

  return (
    <main className="flex items-center justify-center h-svh w-svw gap-6">
      {typesUsers.map(
        ({ id, icon, title, description, link }: TypesUsersProps) => (
          <CardRedirect.Root key={id} href={link}>
            <CardRedirect.Header>
              {icon}
              {title}
            </CardRedirect.Header>
            <CardRedirect.Content>{description}</CardRedirect.Content>
          </CardRedirect.Root>
        )
      )}
    </main>
  )
}

export default Home
