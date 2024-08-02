import * as React from 'react'
import Head from 'next/head'
import LoginIntro from '@/app/components/screens/LoginIntro/LoginIntro';

const LoginPage = () => {

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />

                <title>Login</title>
            </Head>

            <LoginIntro />
        </>
    )
}

export default LoginPage;