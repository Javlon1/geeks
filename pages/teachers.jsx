import * as React from 'react'
import Head from 'next/head'
import Teachers from '@/app/components/screens/Teachers/Teachers';
import AllIntro from '@/app/components/ui/AllIntro/AllIntro';

const TeachersPage = () => {

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />

                <title>GEEKS | O`qituvchilar</title>
            </Head>
            <AllIntro text={"O`qituvchilar"} />
            <Teachers />
        </>
    )
}

export default TeachersPage;