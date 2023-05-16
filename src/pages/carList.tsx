import Head from 'next/head'
import { useRouter } from 'next/router'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import Link from 'next/link'
import { Widget } from '../components/molecule/Widget'
import { BiCamera } from 'react-icons/bi'
import { FiSettings } from 'react-icons/fi'
import { FaListUl } from 'react-icons/fa'
import { CarListItem } from '../components/atom/CarListItem'
import { Button } from '../components/atom/Button'
import { empty, gql, useQuery } from '@apollo/client'
import { Parkzone } from '@prisma/client';

export default function Home() {
  const router = useRouter()

  const AllParkingArea = gql(`
    query {
      parkzones {
        parkzoneName,
        latitude,
        longitude,
        radius
      }
    }
  `)

  const { data } = useQuery(AllParkingArea)

  console.log(data)
  let options = [<option>alle</option>];
  if (data && data.parkzones) {
    data.parkzones.map((parkzone: Parkzone) => {
      options.push(<option>{parkzone.parkzoneName}</option>)
    })
  }


  const handleClickGoToIndex = () => {
    router.push('/')
  }

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
    },
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
    },
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
    },
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

  const parkzones = [
    {
      id: 1304,
      name: "Eulachpassage ZHAW",
    },
    {
      id: 3953,
      name: "Technikum ZHAW",
    }
  ]

  return (
    <div className=''>
      <Head>
        <title>Parking Patrol</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <p className='m-5 text-white text-3xl'>Offene Bussen</p>
      <div className='my-10 mx-5'>
        <select className='p-0 pb-1 w-full text-white bg-transparent border-transparent border-0 border-neutral-400 border-b'>
          {options}
        </select>
        <p className='text-white text-xs'>Parkzone</p>
      </div>
      <div className='flex flex-col'>
        <div className='m-5 p-1 grow rounded-lg bg-neutral-700 overflow-auto drop-shadow-xl'>
          {entries.map((item: any) =>
            <CarListItem plateNumber={item.plateNumber} date={item.date} carType={item.carModel} />
          )}
        </div>
      </div>
      <div className='m-5'>
        <Button label='Zurück' onClick={handleClickGoToIndex} />
      </div>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired();
