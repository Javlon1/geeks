import * as React from 'react'
import Head from 'next/head'
import AllIntro from '@/app/components/ui/AllIntro/AllIntro';
import Detail from '@/app/components/screens/Groups/Detail/Detail';

const GroupDetail = () => {

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />

                <title>GEEKS | Guruhlar</title>
            </Head>

            <AllIntro text="GroupDetail" />
            <Detail />
        </>
    )
}

export default GroupDetail;