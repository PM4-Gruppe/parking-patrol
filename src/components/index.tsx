import React from 'react'
import Header from './organism/Header'

interface Props {
  children: React.ReactNode
}
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-screen bg-gradient-to-t from-neutral-900 to-neutral-700">
      <Header />
      {children}
    </div>
  )
}

export default Layout
