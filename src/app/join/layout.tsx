import { FC, ReactNode } from 'react'

type PrivateLayoutProps = {
  children: ReactNode
}

const PrivateLayout: FC<PrivateLayoutProps> = ({ children }) => {
  return <>{children}</>
}

export default PrivateLayout
