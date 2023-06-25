import Head from 'next/head'
import { CreateParkedCar } from '../components/organism/CreateParkedCar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'

export default function Camera() {

    return (
        <div className="flex flex-col bg-gradient-to-t from-neutral-800 to-neutral-700 min-h-screen">
            <Head>
                <title>Parking Patrol - Camera</title>
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <CreateParkedCar />
            <ToastContainer />
        </div>
    )
}

export const getServerSideProps = withPageAuthRequired();