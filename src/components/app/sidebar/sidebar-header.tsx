import { FC, ReactNode } from 'react'

interface DashboardSidebarHeaderProps {
  children: ReactNode
}

const DashboardSidebarHeader: FC<DashboardSidebarHeaderProps> = ({
  children
}) => {
  return (
    <div className="flex h-14 items-center border-b p-4 lg:h-[60px] lg:px-6">
      {children}
    </div>
  )
}

export default DashboardSidebarHeader
