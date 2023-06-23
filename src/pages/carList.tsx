import Head from 'next/head'
import {useRouter} from 'next/router'
import {withPageAuthRequired} from '@auth0/nextjs-auth0'
import Link from 'next/link'
import {Widget} from '../components/molecule/Widget'
import {BiCamera} from 'react-icons/bi'
import {FiSettings} from 'react-icons/fi'
import {FaListUl} from 'react-icons/fa'
import {CarListItem} from '../components/atom/CarListItem'
import {Button} from '../components/atom/Button'
import {empty, gql, useQuery} from '@apollo/client'
import {Parkzone, ParkedCar} from '@prisma/client';
import {useState} from "react";


export default function Home() {
    const [selectedParkzone, setSelectedParkzone] = useState<string>('alle')
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

    function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const earthRadius: number = 6378.388;
        lat1 = lat1 / 180 * Math.PI
        lat2 = lat2 / 180 * Math.PI
        lon1 = lon1 / 180 * Math.PI
        lon2 = lon2 / 180 * Math.PI

        const a: number = Math.pow(Math.sin((lat2 - lat1) / 2.0), 2) + Math.pow(Math.sin((lon2 - lon1) / 2.0), 2) * Math.cos(lat1) * Math.cos(lat2)
        return earthRadius * 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1.0 - a))
    }

    const {data: allParkzones} = useQuery(AllParkingArea)
    const {data: allParkedCars} = useQuery(AllParkedCars)

    let parkzoneOption = [<option>alle</option>];
    if (allParkzones && allParkzones.parkzones) {
        allParkzones.parkzones.map((parkzone: Parkzone) => {
            parkzoneOption.push(<option>{parkzone.parkzoneName}</option>)
        })
    }

    let parkedCarList: JSX.Element[] = [];
    if (allParkedCars && allParkedCars.parkedCars) {
        allParkedCars.parkedCars.map((parkedCar: ParkedCar) => {
            if(selectedParkzone === 'alle'){
                const modelName = parkedCar.carModel.modelName;
                const manufacturer = parkedCar.carModel.carManufacturer.manufacturerName;
                parkedCarList.push(<CarListItem plateNumber={parkedCar.numberPlate} date={'TODO'}
                                                carType={manufacturer + " " + modelName}/>)
            }
            for (let i = 0; i < allParkzones.parkzones.length; i++) {
                if (allParkzones.parkzones[i].parkzoneName === selectedParkzone) {
                    const distance = getDistance(parkedCar.latitude, parkedCar.longitude, allParkzones.parkzones[i].latitude, allParkzones.parkzones[i].longitude)
                    console.log(distance)
                    if (distance*1000 < allParkzones.parkzones[i].radius) {
                        const modelName = parkedCar.carModel.modelName;
                        const manufacturer = parkedCar.carModel.carManufacturer.manufacturerName;
                        parkedCarList.push(<CarListItem plateNumber={parkedCar.numberPlate} date={'TODO'}
                                                        carType={manufacturer + " " + modelName}/>)
                    }
                }
            }
        })
    }

    const handleClickGoToIndex = () => {
        router.push('/')
    }

    const changeSelectedParkzone = (e: any) => {
        setSelectedParkzone(e.target.value)
    }

    return (
        <div className=''>
            <Head>
                <title>Parking Patrol</title>
                <link rel="icon" href="/favicon.svg"/>
            </Head>
            <p className='m-5 text-white text-3xl'>Offene Bussen</p>
            <div className='my-10 mx-5'>
                <select onChange={(changeSelectedParkzone)}
                        className='p-0 pb-1 w-full text-white bg-transparent border-transparent border-0 border-neutral-400 border-b'>
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
                <Button label='Zurück' onClick={handleClickGoToIndex}/>
            </div>
        </div>
    )
}

export const getServerSideProps = withPageAuthRequired();
