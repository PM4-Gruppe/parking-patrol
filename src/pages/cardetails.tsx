import React from "react";
import {useRouter} from "next/router";
import {withPageAuthRequired} from '@auth0/nextjs-auth0'
import {ParkedCar} from "@prisma/client";
import {isQualifiedName} from "tsutils";
import Image from "next/image";
import Head from "next/head";
import {Button} from "../components/atom/Button";



// @ts-ignore
const Cardetails = () => {

    const handleClickGoToIndex = () => {
        router.push('/carlist')
    }


    const router = useRouter()
    const {carpath} = router.query
    return (
        <div className="">
            <Head>
                <title>Parking Patrol</title>
                <link rel="icon" href="/favicon.svg"/>
            </Head>
            <p className="m-5 text-white text-3xl">Car Details</p>
            <div className="flex flex-col">
                <div className="m-5 p-1 grow rounded-lg bg-neutral-700 overflow-auto drop-shadow-xl">
                    <Image
                        src={'/storage/' + String(carpath)}
                        width={500}
                        height={500}
                        alt="Picture of the author"
                    />
                </div>
            </div>
            <div className="m-5">
                <Button label="Zurück" onClick={handleClickGoToIndex}/>
            </div>
        </div>
    );
};

export default Cardetails;
export const getServerSideProps = withPageAuthRequired();