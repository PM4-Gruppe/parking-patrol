import Head from 'next/head'
import { PhotoChoose } from '../components/molecule/PhotoChoose'
import { Submit } from '../components/atom/Submit'

export default function Camera() {
    return (
        <div>
            <Head>
                <title>Parking Patrol - Camera</title>
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <PhotoChoose />
            <Submit />
        </div>
    )
}
