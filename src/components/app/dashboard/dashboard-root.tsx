import { FC, ReactNode } from 'react'

interface DashboardRootProps {
  children: ReactNode
}

const DashboardRoot: FC<DashboardRootProps> = ({ children }) => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[200px_1fr] lg:grid-cols-[350px_1fr]">
      {children}
    </div>
  )
}

export default DashboardRoot
