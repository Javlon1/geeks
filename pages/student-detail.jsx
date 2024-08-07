import * as React from 'react'
import Head from 'next/head'
import AllIntro from '@/app/components/ui/AllIntro/AllIntro';
import Detail from '@/app/components/screens/Students/Detail/Detail';

const StudentDetail = () => {

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />

                <title>O`quvchi profili</title>
            </Head>

            <AllIntro text="O`quvchi profili" />
            <Detail />
        </>
    )
}

export default StudentDetail;