import * as React from 'react'
import Head from 'next/head'
import AllIntro from '@/app/components/ui/AllIntro/AllIntro';

const StudentDetail = () => {

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />

                <title>StudentDetail</title>
            </Head>

            <AllIntro text="StudentDetail" />
            <h1>StudentDetail</h1>
        </>
    )
}

export default StudentDetail;