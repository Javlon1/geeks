import * as React from 'react'
import Head from 'next/head'
import Statistic from '@/app/components/screens/Statistic/Statistic';

const Index = () => {

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />

                <title>GEEKS</title>
            </Head>
            <Statistic />
        </>
    )
}

export default Index;