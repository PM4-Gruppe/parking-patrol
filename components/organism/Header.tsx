import React from 'react'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0/client'
import Image from 'next/image'

const Header = () => {
  const { user } = useUser()

  return (
    <div className="bg-neutral-800 p-5">
      <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
        {user ? (
          <div className="flex items-center space-x-10">
            <Link href="/api/auth/logout" className="absolute left-5 rounded-full items-center bg-neutral-600 hover:bg-neutral-700 p-3 w-12 h-12 cursor-pointer">
              <Image alt="logoutIcon" src="/logout_icon_48dp.png" width={50} height={50} />
            </Link>
            <Image alt="PolizeiLogo" className="w-32" src="/SH_Polizei_Logo.png" width={300} height={300} />
            <img alt="profile" className="absolute right-5 rounded-full w-12 h-12" width={50} height={50} src={user.picture ? user.picture : ''} />
          </div>
        ) : (
          <Link href="/api/auth/login" className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            Login
          </Link>
        )}
      </nav>
    </div>
  )
}

export default Header