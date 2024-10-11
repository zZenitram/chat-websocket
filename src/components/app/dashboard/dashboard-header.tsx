import { FC, ReactNode } from 'react'

interface DashboardHeaderProps {
  children: ReactNode
}

const DashboardHeader: FC<DashboardHeaderProps> = ({ children }) => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <div className="w-full flex-1">{children}</div>
    </header>
  )
}

export default DashboardHeader
