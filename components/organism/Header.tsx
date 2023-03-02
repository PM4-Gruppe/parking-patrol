import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <header>
      <h1 className="text-4xl text-rose-600">HEADER</h1>
      Link zu Github Repo:{''}
      <Link href="https://github.com/PM4-Gruppe/parking-patrol">hier</Link>{' '}
    </header>
  )
}

export default Header
