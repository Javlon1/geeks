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
                <meta name="description" content="" /> // Описание страницы
                <meta name="keywords" content="" /> // ключевые слова, страницы
                <meta name="image_src" content="" /> // URL для img

                <meta property="og:title" content="O`qituvchilar" /> // Название страницы
                <meta property="og:description" content="" /> // Описание страницы
                <meta property="og:image" content="" /> // URL для img: https://example.com/image.jpg
                <meta property="og:url" content="" /> // оснавное URL: https://example.com/page-url
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="" /> // Название сайта
                <meta property="og:locale" content="ru_RU" />

                <title>O`qituvchilar</title>
            </Head>
            <AllIntro text={"O`qituvchilar"} />
            <Teachers />
        </>
    )
}

export default TeachersPage;