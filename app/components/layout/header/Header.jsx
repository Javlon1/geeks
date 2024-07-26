import * as React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Header.module.scss';
import { Context } from '../../ui/Context/Context';

const Header = () => {
    const { close, setClose } = React.useContext(Context);
    const [ham, setham] = React.useState(false);
    const { pathname } = useRouter();
    const [headerData] = React.useState([
        {
            id: 1,
            link: '/',
            nav: 'Statitika',
            icon: "fa-solid fa-chart-pie"
        },
        {
            id: 2,
            link: '/users',
            nav: 'Foydalanuvchilar',
            icon: "fa-solid fa-users"

        },
        {
            id: 3,
            link: '/accepted',
            nav: 'Mahsulot qabuli',
            icon: "fa-solid fa-check-double"
        },
        {
            id: 4,
            link: '/warehouse',
            nav: 'Ombor',
            icon: "fa-solid fa-warehouse"
        },
        {
            id: 5,
            link: '/bichuv',
            nav: 'Bichuv',
            icon: "fa-solid fa-chart-pie"
        },
        {
            id: 6,
            link: '/sewing',
            nav: 'Tikuv',
            icon: "fa-solid fa-chart-pie"
        },
        {
            id: 7,
            link: '/sales-warehouse',
            nav: 'Sotuv Ombori',
            icon: "fa-solid fa-warehouse"
        },
        {
            id: 8,
            link: '/workers',
            nav: 'Ishchilar',
            icon: "fa-solid fa-user-group"
        },
        {
            id: 9,
            link: '/debts',
            nav: 'Kirim chiqim',
            icon: "fa-solid fa-chart-bar"
        },
        {
            id: 10,
            link: '/credit',
            nav: 'Nasiya va Qarzlar',
            icon: "fa-solid fa-credit-card"
        },
        {
            id: 11,
            link: '/help',
            nav: 'Yordam',
            icon: "fa-solid fa-handshake-angle"
        },
    ]);


    return (
        <div className={`${styles.nav} ${close ? styles.close : ""}`}>
            <div
                className={`${styles.opacity} ${ham ? styles.opacityAct : ""}`}
                onClick={() => {
                    setham(false)
                    setClose(false)
                }}
            ></div>
            {/* sidebar start */}
            <aside className={`${styles.sidebar} ${ham ? styles.actHam : ""}`}>
                <div className={styles.sidebar__top}>
                    <Link href={'/'}>
                        <Image
                            width={150}
                            height={40}
                            alt='logo'
                            priority
                        />
                    </Link>
                    <div className={styles.x}
                        onClick={() => { setham(false) }}>
                        <i className="fa-solid fa-x"></i>
                    </div>
                    <div
                        className={styles.sidebar__top__ham}
                        onClick={() => {
                            setClose(!close)
                        }}

                    >
                        <div className={styles.sidebar__top__ham__btnHam}></div>
                    </div>
                </div>
                {/* navbar start */}
                <nav className={styles.sidebar__nav}>
                    <ul className={styles.sidebar__nav__list}>
                        {
                            headerData?.map((item) => (
                                <li
                                    key={item.id}
                                    className={`${pathname === item.link ? styles.active : ""}`}
                                >
                                    <Link
                                        href={item.link}
                                    >
                                        <i className={item.icon}></i>
                                        <p>
                                            {item.nav}
                                        </p>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
                {/* navbar end */}
            </aside>
            {/* sidebar end */}

            {/* header start */}
            <header className={styles.header}>
                <div className={styles.header__hamburger}
                    onClick={() => {
                        setham(!ham)
                        setClose(false)
                    }}
                ></div>
                <div className={styles.header__search}>
                    <form className={styles.form}>
                        <button type='submit'>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                        <input
                            type="text"
                            placeholder='Search ...'
                        />
                    </form>
                </div>
                <div className={styles.header__list}>
                    <select name="" id="">
                        <option value="">10-06-2021</option>
                    </select>
                    <select name="" id="">
                        <option value="">10-10-2021</option>
                    </select>
                </div>
            </header>
            {/* header end */}
        </div>
    );
};

export default Header;