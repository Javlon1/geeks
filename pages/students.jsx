import * as React from 'react'
import Head from 'next/head'
import AllIntro from '@/app/components/ui/AllIntro/AllIntro';
import Students from '@/app/components/screens/Students/Students';

const StudentsPage = () => {

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />

                <title>GEEKS | O`quvchilar</title>
            </Head>
            <AllIntro text={"O`quvchilar"} />
            <Students />
        </>
    )
}

export default StudentsPage;