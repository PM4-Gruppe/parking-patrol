import Head from 'next/head'
import { parkedCars } from '../data/parkedCars'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Parking Patrol</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <div className="container mx-auto max-w-5xl my-20">
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
