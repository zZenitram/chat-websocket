import { FC, ReactNode } from 'react'

interface DashboardSidebarFooterProps {
  children: ReactNode
}

const DashboardSidebarFooter: FC<DashboardSidebarFooterProps> = ({
  children
}) => {
  return (
    <div className="flex justify-between items-center gap-2 mt-auto p-4 border-t">
      {children}
    </div>
  )
}

export default DashboardSidebarFooter
