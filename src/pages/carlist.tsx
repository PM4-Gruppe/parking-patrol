import Head from 'next/head'
import { useRouter } from 'next/router'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CarListItem } from '../components/atom/CarListItem'
import { Button } from '../components/atom/Button'
import { gql, useQuery } from '@apollo/client'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()

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
        controlTime,
        carInspector,
        latitude,
        longitude,
        photoPath
      }
    }
  `)

  const { loading, error, data, refetch } = useQuery(AllParkedCars)

  useEffect(() => {
    refetch()
  }, [refetch])

  const handleClickGoToIndex = () => {
    router.push('/')
  }

  if (!data || error) return <p>Error...</p>
  if (loading) return <p>Loading...</p>
  return (
    <div className="">
      <Head>
        <title>Parking Patrol</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <p className="m-5 text-white text-3xl">Erfasste Fahrzeuge</p>
      <div className="flex flex-col">
        <div className="m-5 p-1 grow rounded-lg bg-neutral-700 overflow-auto drop-shadow-xl">
          {data.parkedCars.map((parkedCar: any) => (
            <CarListItem
              key={parkedCar.numberPlate + parkedCar.photoPath}
              plateNumber={parkedCar.numberPlate}
              date={parkedCar.controlTime}
              carType={`${parkedCar.carModel.carManufacturer.manufacturerName} ${parkedCar.carModel.modelName}`}
              carPath={parkedCar.photoPath}
            />
          ))}
        </div>
      </div>
      <div className="m-5">
        <Button label="Zurück" onClick={handleClickGoToIndex} />
      </div>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired()
