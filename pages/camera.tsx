import Head from 'next/head'
import { PhotoTaker } from '../components/molecule/photoTaker'
//import PhotoTaker from '../components/molecule/photoTaker'

export default function Camera() {
    return (
        <div>
            <Head>
                <title>Parking Patrol - Camera</title>
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <PhotoTaker />
        </div>
    )
}
