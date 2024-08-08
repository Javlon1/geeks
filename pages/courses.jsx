import * as React from 'react'
import Head from 'next/head'
import AllIntro from '@/app/components/ui/AllIntro/AllIntro';
import Courses from '@/app/components/screens/Settings/Courses/Courses';

const CoursesPage = () => {

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />

                <title>GEEKS | Kurslar</title>
            </Head>

            <AllIntro text={"Kurslar"} />
            <Courses />
        </>
    )
}

export default CoursesPage;