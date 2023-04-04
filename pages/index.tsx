import Head from 'next/head'
import { gql, useQuery } from '@apollo/client'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'

const AllVehiclesQuery = gql(`
  query {
    parkedCars {
      numberPlate
    }
  }
`)


export default function Home() {
  const { data, loading, error } = useQuery(AllVehiclesQuery)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <div>
      <Head>
        <title>Parking Patrol</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <div className="container mx-auto max-w-5xl my-20">
        <p className="text-3xl">Fetched content:</p>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.parkedCars.map((plate: any) => (
            <li key={plate.sign}>
              {plate.numberPlate}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired();