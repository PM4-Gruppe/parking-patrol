import Head from 'next/head'
import { PhotoChoose } from '../components/molecule/PhotoChoose'
import TakePhoto from '../components/molecule/TakePhoto'

export default function Camera() {
    return (
        <div>
            <Head>
                <title>Parking Patrol - Camera</title>
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <p>Please select a already taken photo or take a new one!</p>
            <PhotoChoose />
            <TakePhoto />
        </div>
    )
}


