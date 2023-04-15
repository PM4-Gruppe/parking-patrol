import Head from 'next/head'
import { PhotoChoose } from '../components/molecule/PhotoChoose'
import { Button } from '../components/atom/Button'
import { useRouter } from 'next/router'

export default function Camera() {
    const router = useRouter()

    const handleSubmitButton = () => {
        //TODO add functionality to submit button -> send data to backend, ...
        console.log('Submit button clicked')
    }

    const handleBackButton = () => {
        router.back()
    }

    return (
        <div>
            <Head>
                <title>Parking Patrol - Camera</title>
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <PhotoChoose />
            <Button
                label="Prüfen"
                onClick={handleSubmitButton}
            />
            <Button
                label="Zurück"
                onClick={handleBackButton}
            />
        </div>
    )
}
