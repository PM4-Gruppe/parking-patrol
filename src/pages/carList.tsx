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
import { Parkzone, ParkedCar } from '@prisma/client';


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

  const AllParkedCars = gql(`
    query {
      parkedCars {
        numberPlate,
        carModel{
          modelName,
          carManufacturer{
            manufacturerName
          }
        },
        carInspector,
        latitude,
        longitude,
      }
    }
  `)

  const { data: allParkzones } = useQuery(AllParkingArea)
  const { data: allParkedCars } = useQuery(AllParkedCars)

  let parkzoneOption = [<option>alle</option>];
  if (allParkzones && allParkzones.parkzones) {
    allParkzones.parkzones.map((parkzone: Parkzone) => {
      parkzoneOption.push(<option>{parkzone.parkzoneName}</option>)
    })
  }

  let parkedCarList: JSX.Element[] = [];
  if (allParkedCars && allParkedCars.parkedCars) {
    allParkedCars.parkedCars.map((parkedCar: ParkedCar) => {
      console.log(parkedCar)

      parkedCarList.push(<CarListItem plateNumber={parkedCar.numberPlate} date={'12.07.2043 19:47'} carType={parkedCar.carModel.carManufacturer.manufacturerName + " " + parkedCar.carModel.modelName} />)
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

  return (
    <div className=''>
      <Head>
        <title>Parking Patrol</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <p className='m-5 text-white text-3xl'>Offene Bussen</p>
      <div className='my-10 mx-5'>
        <select className='p-0 pb-1 w-full text-white bg-transparent border-transparent border-0 border-neutral-400 border-b'>
          {parkzoneOption}
        </select>
        <p className='text-white text-xs'>Parkzone</p>
      </div>
      <div className='flex flex-col'>
        <div className='m-5 p-1 grow rounded-lg bg-neutral-700 overflow-auto drop-shadow-xl'>
          {parkedCarList}
        </div>
      </div>
      <div className='m-5'>
        <Button label='Zurück' onClick={handleClickGoToIndex} />
      </div>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired();
