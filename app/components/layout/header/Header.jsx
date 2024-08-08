import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Header.module.scss';
import { Context } from '../../ui/Context/Context';
import { useContext, useEffect, useState } from 'react';
import Select from "react-select";
import userImg from '../../../../public/img/me.jpg';
import logo from '../../../../public/img/logo.png';

const Header = () => {
    const { close, setClose } = useContext(Context);
    const [ham, setham] = useState(false);
    const [element, setElement] = useState(false);
    const [notification, setNotification] = useState(false);
    const [user, setUser] = useState(false);
    const [addStudent, setAddStudent] = useState(false);
    const [addPayment, setAddPayment] = useState(false);
    const [profile, setProfile] = useState(false);
    const [paymentHeader, setPaymentHeader] = useState(false);
    const [settingsHeader, setSettingsHeader] = useState(false);
    const { pathname } = useRouter();
    const [headerData] = useState([
        { id: 1, link: '/', nav: 'Statitika', icon: 'fa-solid fa-chart-pie' },
        { id: 2, link: '/lids', nav: 'Lidlar', icon: 'fa-solid fa-users' },
        { id: 3, link: '/teachers', nav: 'O`qituvchilar', icon: 'fa-solid fa-chalkboard-user' },
        { id: 4, link: '/groups', nav: 'Guruhlar', icon: 'fa-solid fa-layer-group' },
        { id: 5, link: '/students', nav: 'O`quvchilar', icon: 'fa-solid fa-graduation-cap' },
    ]);

    const [paymentHeaderData] = useState([
        {
            id: 1,
            link: "/all-payments",
            nav: "Barcha to'lovlar",
            icon: "fa-solid fa-money-bill-1",
        },
        {
            id: 2,
            link: "/take-off",
            nav: "Yechib olish",
            icon: "fa-solid fa-credit-card",
        },
        {
            id: 3,
            link: '/expenses',
            nav: 'Xarajatlar',
            icon: 'fa-solid fa-chart-pie'
        },
        {
            id: 4,
            link: '/salary',
            nav: 'Ish haqi',
            icon: 'fa-regular fa-clipboard'
        },
        {
            id: 5,
            link: '/debtors',
            nav: 'Qarzdorlar',
            icon: 'fa-solid fa-triangle-exclamation'
        },
    ]);

    const [settingsHeaderData] = useState([
        {
            id: 1,
            link: "/employees",
            nav: "Xodimlar",
            icon: "fa-solid fa-money-bill-1",
        },
        {
            id: 2,
            link: "/courses",
            nav: "Kurslar",
            icon: "fa-solid fa-layer-group",
        },
        {
            id: 3,
            link: '/rooms',
            nav: 'Xonalar',
            icon: 'fa-solid fa-chart-pie'
        },
        {
            id: 4,
            link: '/left-group',
            nav: 'Guruxni tark etganlar',
            icon: 'fa-regular fa-clipboard'
        }
    ]);

    const [paymentData, setPaymentData] = useState([{ id: 1, name: 'Jony', }, { id: 2, name: 'Alex', }, { id: 3, name: 'Jasur', }, { id: 4, name: 'Saidjalol', }]);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [formPaymentData, setFormPaymentData] = useState({
        student: '',
        paymentMethod: '',
        amount: '',
        date: '',
        comment: ''
    });

    useEffect(() => {
        // Fetch product data from your API and update state
        // Example: fetchProducts();
    }, []);

    const handleProductChange = (selectedOption) => {
        setSelectedPayment(selectedOption);
        setFormPaymentData({
            ...formPaymentData,
            student: selectedOption ? selectedOption.value : ''
        });
    };

    const productOptions = paymentData.map((item) => ({
        value: item.id,
        label: item.name,
    }));

    const handlePaymentChange = (e) => {
        const { name, value } = e.target;
        setFormPaymentData({
            ...formPaymentData,
            [name]: value
        });
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        console.log(formPaymentData);
        setAddPayment(false);
        setAddStudent(false);
        setSelectedPayment(null);
        setFormPaymentData({
            student: '',
            paymentMethod: '',
            amount: '',
            date: '',
            comment: ''
        })
    };
    if (pathname === '/login') {
        return null;
    }
    return (
        <div className={`${styles.nav} ${close ? styles.close : ""}`}>
            <div
                className={`${styles.opacity} ${ham || addStudent || addPayment || profile ? styles.opacityAct : ""}`}
                onClick={() => {
                    setham(false)
                    setClose(false)
                    setAddStudent(false)
                    setAddPayment(false)
                    setProfile(false)
                }}
            ></div>
            {/* sidebar start */}
            <aside className={`${styles.sidebar} ${ham ? styles.actHam : ""}`}>
                <div className={styles.sidebar__top}>
                    <Link
                        href={'/'}
                        onClick={() => setham(false)}
                    >
                        <Image
                            src={logo}
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
                                <Link
                                    key={item.id}
                                    className={`${pathname === item.link ? styles.active : ""}`}
                                    href={item.link}
                                    onClick={() => setham(false)}
                                >
                                    <li>
                                        <i className={item.icon}></i>
                                        <p>
                                            {item.nav}
                                        </p>
                                    </li>
                                </Link>
                            ))
                        }
                    </ul>
                    <ul className={styles.sidebar__nav__list}>
                        {close ? (
                            <b>
                                <i className="fa-solid fa-ellipsis"></i>
                            </b>
                        ) : (
                            <b onClick={() => setPaymentHeader(!paymentHeader)} className={styles.b}>
                                To'lovlar
                                <p>
                                    <i
                                        className={`fa-solid ${!paymentHeader ? "fa-angle-up" : "fa-angle-down"
                                            }`}
                                    ></i>
                                </p>
                            </b>
                        )}
                        {paymentHeader && (paymentHeaderData?.map((item) => (
                            <Link
                                key={item.id}
                                className={`${pathname === item.link ? styles.active : ""}`}
                                href={item.link}
                                onClick={() => setham(false)}
                            >
                                <li>
                                    <i className={item.icon}></i>
                                    <p>
                                        {item.nav}
                                    </p>
                                </li>
                            </Link>
                        )))}
                    </ul>
                    <ul className={styles.sidebar__nav__list}>
                        {close ? (
                            <b>
                                <i className="fa-solid fa-ellipsis"></i>
                            </b>
                        ) : (
                            <b onClick={() => setSettingsHeader(!settingsHeader)} className={styles.b}>
                                Sozlamalar
                                <p>
                                    <i
                                        className={`fa-solid ${!settingsHeader ? "fa-angle-up" : "fa-angle-down"
                                            }`}
                                    ></i>
                                </p>
                            </b>
                        )}
                        {settingsHeader && (settingsHeaderData?.map((item) => (
                            <Link
                                key={item.id}
                                className={`${pathname === item.link ? styles.active : ""}`}
                                href={item.link}
                                onClick={() => setham(false)}
                            >
                                <li>
                                    <i className={item.icon}></i>
                                    <p>
                                        {item.nav}
                                    </p>
                                </li>
                            </Link>
                        )))}
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
                        <input
                            type="text"
                            placeholder='Qidiruv ...'
                        />
                        <button className={styles.btn} type='submit'>
                            <strong>search</strong>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                </div>

                <div className={styles.header__list}>
                    <div className={styles.header__list__item}>
                        <span onClick={() => {
                            setElement(!element)
                            setNotification(false)
                            setUser(false)
                        }} className={styles.header__list__item__span}>
                            <i className="fa-solid fa-plus"></i>
                        </span>
                        <ul className={`${styles.header__list__item__elements} ${element ? styles.elementsAct : ""}`}>
                            <li
                                className={styles.header__list__item__elements__item}
                                onClick={() => {
                                    setElement(false)
                                    setAddStudent(true)
                                    setAddPayment(false)
                                }}
                            >
                                <i className='fa-solid fa-plus'></i>
                                <p>Yangi talaba</p>
                            </li>
                            <li
                                className={styles.header__list__item__elements__item}
                                onClick={() => {
                                    setElement(false)
                                    setAddPayment(true)
                                    setAddStudent(false)
                                }}
                            >
                                <i className="fa-solid fa-money-bill-1-wave"></i>
                                <p>To'lov</p>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.header__list__item}>
                        <span onClick={() => {
                            setNotification(!notification)
                            setElement(false)
                            setUser(false)
                        }} className={styles.header__list__item__span}>
                            <i className="fa-solid fa-bell"></i>
                        </span>
                        <div className={`${styles.header__list__item__elements} ${notification ? styles.elementsAct : ""}`}>
                            <div className={styles.header__list__item__elements__header}>
                                <p></p>
                                <p>Jony</p>
                            </div>
                            <div className={styles.header__list__item__elements__body}>
                                <p className={styles.text}>Lorem ipsum dolor sit amet.</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.header__list__item}>
                        <span onClick={() => {
                            setUser(!user)
                            setElement(false)
                            setNotification(false)
                        }} className={styles.header__list__item__span}>
                            <i className="fa-solid fa-user"></i>
                        </span>
                        <div className={`${styles.header__list__item__elements} ${user ? styles.elementsAct : ""}`}>
                            <div className={styles.header__list__item__elements__header}>
                                <Image
                                    width={40}
                                    height={40}
                                    src={userImg}
                                    alt='user'
                                />
                                <p>Mukhammadjonov Javlon</p>
                            </div>
                            <div className={styles.header__list__item__elements__body}>
                                <button>
                                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <span
                    className={styles.span}
                    onClick={() => {
                        setProfile(!profile)
                    }}
                >
                    <i className="fa-solid fa-list-ul"></i>
                </span>
                <div className={`${styles.header__profile} ${profile ? styles.elementsAct : ""}`}>
                    <div className={styles.header__search}>
                        <form className={styles.form}>
                            <input
                                type="text"
                                placeholder='Qidiruv ...'
                            />
                            <button className={styles.btn} type='submit'>
                                <strong>search</strong>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </form>
                    </div>
                    <div className={styles.header__list}>
                        <div className={styles.header__list__item}>
                            <span onClick={() => {
                                setElement(!element)
                                setNotification(false)
                                setUser(false)

                            }} className={styles.header__list__item__span}>
                                <i className="fa-solid fa-plus"></i>
                            </span>
                            <ul className={`${styles.header__list__item__elements} ${element ? styles.elementsAct : ""}`}>
                                <li
                                    className={styles.header__list__item__elements__item}
                                    onClick={() => {
                                        setElement(false)
                                        setAddStudent(true)
                                        setAddPayment(false)
                                        setProfile(false)
                                    }}
                                >
                                    <i className='fa-solid fa-plus'></i>
                                    <p>Yangi talaba</p>
                                </li>
                                <li
                                    className={styles.header__list__item__elements__item}
                                    onClick={() => {
                                        setElement(false)
                                        setAddPayment(true)
                                        setAddStudent(false)
                                        setProfile(false)
                                    }}
                                >
                                    <i className="fa-solid fa-money-bill-1-wave"></i>
                                    <p>To'lov</p>
                                </li>
                            </ul>
                        </div>

                        <div className={styles.header__list__item}>
                            <span onClick={() => {
                                setNotification(!notification)
                                setElement(false)
                                setUser(false)
                            }} className={styles.header__list__item__span}>
                                <i className="fa-solid fa-bell"></i>
                            </span>
                            <div className={`${styles.header__list__item__elements} ${notification ? styles.elementsAct : ""}`}>
                                <div className={styles.header__list__item__elements__header}>
                                    <p></p>
                                    <p>Jony</p>
                                </div>
                                <div className={styles.header__list__item__elements__body}>
                                    <p className={styles.text}>Lorem ipsum dolor sit amet.</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.header__list__item}>
                            <span onClick={() => {
                                setUser(!user)
                                setElement(false)
                                setNotification(false)

                            }} className={styles.header__list__item__span}>
                                <i className="fa-solid fa-user"></i>
                            </span>
                            <div className={`${styles.header__list__item__elements} ${user ? styles.elementsAct : ""}`}>
                                <div className={styles.header__list__item__elements__header}>
                                    <Image
                                        width={40}
                                        height={40}
                                        src={userImg}
                                        alt='user'
                                    />
                                    <p>Mukhammadjonov Javlon</p>
                                </div>
                                <div className={styles.header__list__item__elements__body}>
                                    <button>
                                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className={`${styles.header__register} ${addStudent || addPayment ? styles.registerAct : ""}`}>
                <div style={{ display: addStudent ? '' : 'none' }} className={styles.header__register__list}>
                    <div className={styles.header__register__list__header}>
                        <p>Yangi talaba qo'shish</p>
                        <i onClick={() => setAddStudent(false)} className="fa-solid fa-x"></i>
                    </div>
                    <form className={styles.header__register__list__form}>
                        <label htmlFor="">
                            <p>Ismi</p>
                            <input type="text" />
                        </label>
                        <label htmlFor="">
                            <p>Familiyasi</p>
                            <input type="text" />
                        </label>
                        <label htmlFor="">
                            <p>Telefoni:</p>
                            <input type="text" />
                        </label>
                        <label htmlFor="">
                            <p>Telefoni:</p>
                            <input type="text" />
                        </label>
                        <label htmlFor="student">
                            <p>Qaysi kursga ?:</p>
                            <Select
                                options={productOptions}
                                placeholder
                                value={selectedPayment}
                                onChange={handleProductChange}
                                required
                            />
                        </label>
                        <label htmlFor="comment">
                            <p>Izoh:</p>
                            <textarea
                                id="comment"
                                name="comment"
                            />
                        </label>

                        <button type="submit">Yuborish</button>
                    </form>
                </div>
                <div style={{ display: addPayment ? '' : 'none' }} className={styles.header__register__list}>
                    <div className={styles.header__register__list__header}>
                        <p>To'lov qo'shish</p>
                        <i onClick={() => setAddPayment(false)} className="fa-solid fa-x"></i>
                    </div>
                    <form className={styles.header__register__list__form} onSubmit={handlePaymentSubmit}>
                        <label htmlFor="student">
                            <p>Talaba:</p>
                            <Select
                                options={productOptions}
                                placeholder
                                value={selectedPayment}
                                onChange={handleProductChange}
                                required
                            />
                        </label>

                        <span>
                            <p>To'lov usuli:</p>
                            <label htmlFor="cash">
                                <input
                                    id="cash"
                                    type="radio"
                                    name="paymentMethod"
                                    value="Naqd pul"
                                    required
                                    checked={formPaymentData.paymentMethod === 'Naqd pul'}
                                    onChange={handlePaymentChange}
                                />
                                <p>Naqd pul</p>
                            </label>
                            <label htmlFor="card">
                                <input
                                    id="card"
                                    type="radio"
                                    name="paymentMethod"
                                    value="Plastik kartasi"
                                    required
                                    checked={formPaymentData.paymentMethod === 'Plastik kartasi'}
                                    onChange={handlePaymentChange}
                                />
                                <p>Plastik kartasi</p>
                            </label>
                            <label htmlFor="bank">
                                <input
                                    id="bank"
                                    type="radio"
                                    name="paymentMethod"
                                    value="Bank hisobi"
                                    required
                                    checked={formPaymentData.paymentMethod === 'Bank hisobi'}
                                    onChange={handlePaymentChange}
                                />
                                <p>Bank hisobi</p>
                            </label>
                        </span>

                        <label htmlFor="amount">
                            <p>Miqdor:</p>
                            <input
                                id="amount"
                                name="amount"
                                type="text"
                                required
                                value={formPaymentData.amount}
                                onChange={handlePaymentChange}
                            />
                        </label>

                        <label htmlFor="date">
                            <p>Sana:</p>
                            <input
                                id="date"
                                name="date"
                                type="date"
                                required
                                value={formPaymentData.date}
                                onChange={handlePaymentChange}
                            />
                        </label>

                        <label htmlFor="comment">
                            <p>Izoh:</p>
                            <textarea
                                id="comment"
                                name="comment"
                                value={formPaymentData.comment}
                                onChange={handlePaymentChange}
                            />
                        </label>

                        <button type="submit">Yuborish</button>
                    </form>
                </div>
            </div>
            {/* header end */}
        </div>
    );
};

export default Header;