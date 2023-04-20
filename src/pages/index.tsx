import Head from 'next/head'
import { gql, useQuery } from '@apollo/client'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import Link from 'next/link'
import Image from 'next/image'
import { Widget } from '../components/molecule/Widget'
import { BiCamera } from 'react-icons/bi'
import { FiSettings } from 'react-icons/fi'
import { FaListUl } from 'react-icons/fa'

export default function Home() {
  return (
    <div className="mb-auto">
      <Head>
        <title>Parking Patrol</title>it
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div className="flex flex-col center justify-evenly m-10">
        <div className="p-5">
          <Widget title={"Aktuelle Parkzone"} content={"Beispielstrasse"} />
        </div>
        <div className="flex flex-row center justify-between">
          <div className='w-1/2 p-5'>
            <Widget title={"Erfasste Fahrzeuge"} content={"-"} />
          </div>
          <div className="w-1/2 p-5">
            <Widget title={"Offene Vergehen"} content={"-"} />
          </div>
        </div>
      </div>
      <div id="main" className="flex justify-center w-100 h-full">
        <div className="absolute inset-x-0 bottom-0 h-28 bg-neutral-900" />
        <Link className="absolute bottom-16" href="/camera">
          <div className="bg-green-700 hover:bg-green-800 rounded-full p-5 border-solid border-8 border-neutral-800">
            <BiCamera className='w-20 h-20 p-1 text-white' />
          </div>
        </Link>
        <Link className="absolute bottom-5 left-20 rounded-full items-center bg-neutral-900 hover:bg-neutral-700" href={'https://en.wikipedia.org/wiki/Settings_(Windows)'}>
          <FiSettings className='w-20 h-20 p-4 text-white' />
        </Link>
        <Link className="absolute bottom-6 right-20 rounded-full items-center bg-neutral-900 hover:bg-neutral-700" href={'https://en.wikipedia.org/wiki/List_(information)'}>
          <FaListUl className='w-20 h-20 p-4 text-white' />
        </Link>
      </div>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired();