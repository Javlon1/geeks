import * as React from 'react'
import Head from 'next/head'
import AllIntro from '@/app/components/ui/AllIntro/AllIntro';
import RoomsIntro from '@/app/components/screens/Settings/RoomsIntro/RoomsIntro';

const Rooms = () => {

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />

                <title>Xonalar</title>
            </Head>

            <AllIntro text="Xonalar" />
            <RoomsIntro />
        </>
    )
}

export default Rooms;