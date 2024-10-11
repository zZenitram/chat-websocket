import { FC, ReactNode } from 'react'

interface DashboardSidebarContentProps {
  children: ReactNode
}

const DashboardSidebarContent: FC<DashboardSidebarContentProps> = ({ children }) => {
  return (
    <div className="flex-1 p-4">
      <nav className="grid items-start text-sm font-medium">
        {children}
      </nav>
    </div>
  )
}

export default DashboardSidebarContent
