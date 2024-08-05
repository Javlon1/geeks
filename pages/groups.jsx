import * as React from 'react'
import Head from 'next/head'
import AllIntro from '@/app/components/ui/AllIntro/AllIntro';
import Groups from '@/app/components/screens/Groups/Groups';

const GroupsPage = () => {

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />

                <title>GEEKS | Guruhlar</title>
            </Head>

            <AllIntro text={"Aktiv Guruhlar"} />
            <Groups />
        </>
    )
}

export default GroupsPage;