import * as React from 'react'
import Head from 'next/head'
import AllIntro from '@/app/components/ui/AllIntro/AllIntro';
import LeftGroupIntro from '@/app/components/screens/Settings/LeftGroup/LeftGroupIntro';

const LeftGroup = () => {

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />

                <title>Guruxni tark etganlar</title>
            </Head>

            <AllIntro text={"Guruxni tark etganlar"} />
            <LeftGroupIntro />
        </>
    )
}

export default LeftGroup;