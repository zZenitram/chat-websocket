import { FC, ReactNode } from 'react'

interface DashboardContentProps {
  children: ReactNode
}

const DashboardContent: FC<DashboardContentProps> = ({ children }) => {
  return (
    <main className="flex flex-1 flex-col gap-4 lg:gap-6">
      <div className="flex flex-1 justify-center rounded-lg" x-chunk="dashboard-02-chunk-1">
        <div className="flex flex-col w-full p-6 pt-0 lg:px-52 overflow-auto h-[calc(100vh-82px)]">
          {children}
        </div>
      </div>
    </main>
  )
}

export default DashboardContent
