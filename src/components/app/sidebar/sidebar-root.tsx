import { FC, ReactNode } from 'react'

interface DashboardSidebarRootProps {
  children: ReactNode
}

const DashboardSidebarRoot: FC<DashboardSidebarRootProps> = ({ children }) => {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">{children}</div>
    </div>
  )
}

export default DashboardSidebarRoot
