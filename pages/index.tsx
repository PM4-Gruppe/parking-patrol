import Head from 'next/head'
import { parkedCars } from '../data/parkedCars'
import { gql, useQuery } from '@apollo/client'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'

const AllVehiclesQuery = gql(`
  query {
    vehicles {
      id
      licensePlate {
        sign
        owner {
          firstname
          lastname
        }
      }
    }
  }
`)

export default function Home() {
  const { data, loading, error } = useQuery(AllVehiclesQuery)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>

  console.log('hallo', data)

  return (
    <div>
      <Head>
        <title>Parking Patrol</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <div className="container mx-auto max-w-5xl my-20">
        <p className="text-3xl">Fetched content:</p>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data?.vehicles.map((vehicle: any) => ( //Prevent type any!!
            <li key={vehicle.id}>
              {vehicle.licensePlate.sign}
              {vehicle.licensePlate.owner.firstname}
              {vehicle.licensePlate.owner.lastname}
            </li>
          ))}
        </ul>
      </div>


      <div className="container mx-auto max-w-5xl my-20">
        <p className="text-3xl">Hardcoded content:</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {parkedCars.map((car) => (
            <li key={'missing key'} className="shadow  max-w-md  rounded">
              <img className="shadow-sm" src={String(car.evidencePhotoUrl)} />
              <div className="p-5 flex flex-col space-y-2">
                <p className="text-lg font-medium">Titel</p>
                <p className="text-gray-600">{car.licensePlate.sign}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired();