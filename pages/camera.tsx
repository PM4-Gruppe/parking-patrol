import Head from 'next/head'
import { PhotoChoose } from '../components/molecule/PhotoChoose'

export default function Camera() {
    return (
        <div>
            <Head>
                <title>Parking Patrol - Camera</title>
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <PhotoChoose />
        </div>
    )
}
