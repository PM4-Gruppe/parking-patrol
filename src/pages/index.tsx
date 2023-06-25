import Head from 'next/head'
import { gql, useQuery } from '@apollo/client'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import Link from 'next/link'
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
          <Widget title={"Aktuelle Parkzone"}>
            <div>
              <p className="text-white text-lg">aktuell in keiner Parkzone</p>
              <p className="text-neutral-400 text-sm m-0 p-0">nächste Parkzone Eulachpassage ist 300m entfernt</p>
            </div>
          </Widget>
        </div>
        <div className="flex flex-row center justify-between">
          <div className="w-1/2 p-5">
            <Widget title={"Erfasste Fahrzeuge"}>
              <p className="text-white text-lg">192 Fahrzeuge</p>
            </Widget>
          </div>
          <div className="w-1/2 p-5">
            <Widget title={"Offene Vergehen"}>
              <p className="text-white text-lg">23 Vergehen</p>
            </Widget>
          </div>
        </div>
      </div>
      <div id="main" className="flex justify-center w-100 h-full">
        <div className="absolute inset-x-0 bottom-0 h-28 bg-neutral-900" />
        <Link className="absolute bottom-16" href="/camera">
          <div className="bg-green-700 hover:bg-green-800 rounded-full p-5 border-solid border-8 border-neutral-800">
            <BiCamera className="w-20 h-20 p-1 text-white" />
          </div>
        </Link>
        <Link className="absolute bottom-6 right-20 rounded-full items-center bg-neutral-900 hover:bg-neutral-700" href="/carlist">
          <FaListUl className="w-20 h-20 p-4 text-white" />
        </Link>
      </div>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired();
