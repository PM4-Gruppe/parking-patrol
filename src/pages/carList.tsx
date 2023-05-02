import Head from 'next/head'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import Link from 'next/link'
import { Widget } from '../components/molecule/Widget'
import { BiCamera } from 'react-icons/bi'
import { FiSettings } from 'react-icons/fi'
import { FaListUl } from 'react-icons/fa'
import { CarListItem } from '../components/atom/CarListItem'

export default function Home() {

  const entries = [
    {
      plateNumber: "SH 41'851",
      date: "21.02.2023 22:37",
      carModel: "BMW 535i"
    },
    {
      plateNumber: "ZH 932'503",
      date: "04.04.2023 08:30",
      carModel: "Nissan Maxima"
    },
    {
      plateNumber: "ZH 583'120",
      date: "23.03.2023 18:30",
      carModel: "Lancia Delta"
    },
    {
      plateNumber: "TG 39'909",
      date: "04.04.2023 08:30",
      carModel: "Toyota Corolla"
    }
  ]

  return (
    <div className="mb-auto">
      <Head>
        <title>Parking Patrol</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <p className='m-5 text-white text-3xl'>Offene Bussen</p>
      <div className='my-10 mx-5'>
        <select className='p-0 pb-1 w-full text-white bg-transparent border-transparent border-0 border-neutral-500 border-b'>
          <option>alle</option>
          <option>ZHAW Eulach</option>
          <option>ZHAW Technikum</option>
        </select>
        <p className='text-white text-xs'>Parkzone</p>
      </div>
      <div className='m-5 p-1 rounded-lg bg-neutral-700 drop-shadow-xl'>
        {entries.map((item: any) =>
          <CarListItem plateNumber={item.plateNumber} date={item.date} carType={item.carModel} />
        )}
      </div>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired();
