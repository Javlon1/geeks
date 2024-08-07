import Link from 'next/link'
import Image from 'next/image'
import styles from './Detail.module.scss'
import { Context } from '@/app/components/ui/Context/Context';
import LeftIntro from '@/app/components/ui/Left/LeftIntro';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

const data = [
    {
        id: 1,
        firstName: "Javlon",
        lastName: "Mukhammadjonov",
        phone: "+998905251243",
        group: "Front-end",
        activateDate: "03.05.2023",
        startedDate: "05.07.2023",
        teacher: "Mukhammadjonov Javlon",
        balance: "5000000",
        course: "kids english",
        groupPrice: 170000,
        status: "Guruhdan chiqarilgan",
        addedDate: "10-Iyun, 2024-yil 8:57",
        studentPrice: "170000 so'm",
        schedule: "(Du-Cho-Ju) • 08:00",
        endDate: "31-May, 2025-yil",
        oddDays: true,
    },
    {
        id: 2,
        firstName: "Alex",
        lastName: "Johnson",
        phone: "+998901234567",
        group: "Back-end",
        activateDate: "01.04.2023",
        startedDate: "15.06.2023",
        teacher: "Doe John",
        balance: "3500000",
        course: "professional english",
        groupPrice: 200000,
        status: "Aktiv",
        addedDate: "12-April, 2024-yil 9:30",
        studentPrice: "200000 so'm",
        schedule: "(Si-Pa-Sh) • 10:00",
        endDate: "25-April, 2025-yil",
        oddDays: false,
    },
    {
        id: 3,
        firstName: "Sara",
        lastName: "Smith",
        phone: "+998907654321",
        group: "Mobile Development",
        activateDate: "15.03.2023",
        startedDate: "20.06.2023",
        teacher: "Smith Jane",
        balance: "2500000",
        course: "advanced english",
        groupPrice: 150000,
        status: "Aktiv",
        addedDate: "18-March, 2024-yil 14:15",
        studentPrice: "150000 so'm",
        schedule: "(Du-Chor-Pay) • 14:00",
        endDate: "20-March, 2025-yil",
        oddDays: true,
    },
    {
        id: 4,
        firstName: "Jasur",
        lastName: "Bekmuratov",
        phone: "+998908888888",
        group: "Data Science",
        activateDate: "12.02.2023",
        startedDate: "01.05.2023",
        teacher: "Bekmuratov Jasur",
        balance: "4000000",
        course: "business english",
        groupPrice: 180000,
        status: "Guruhdan chiqarilgan",
        addedDate: "05-February, 2024-yil 11:45",
        studentPrice: "180000 so'm",
        schedule: "(Ju-Sha) • 09:00",
        endDate: "02-February, 2025-yil",
        oddDays: false,
    },
];


const Detail = () => {
    const router = useRouter();
    const { lan } = useContext(Context);
    const [activeItem, setActiveItem] = useState('Guruhlar');
    const attendanceData = ['Guruhlar', 'Izoh', 'Qarzdorliklar tarixi', "To'lovlar", "Tarixi"];

    const handleClick = (item) => {
        setActiveItem(item);
    };


    return (
        <LeftIntro>
            <div className={styles.detail}>
                <div className={styles.detail__left}>
                    <div className={styles.detail__left__content}>
                        <span className={styles.detail__left__content__title}>
                            <b>Mukhammadjonov Javlon</b>
                            <p>(id: 1)</p>
                        </span>
                        <div className={styles.detail__left__content__balance}>
                            <p>balans:</p>
                            <span>-470000 so'm</span>
                        </div>
                        <span className={styles.detail__left__content__elements}>
                            <p>Telefon raqami:</p>
                            <a href={`tel:${998905251243}`}>
                                <i className="fa-solid fa-phone"></i>
                                {998905251243}
                            </a>
                        </span>
                        <span className={styles.detail__left__content__elements}>
                            <button>
                                <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button>
                                <i className="fa-regular fa-envelope"></i>
                            </button>
                            <button>
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </span>
                        <div className={styles.detail__left__content__bottom}>
                            <div className={styles.detail__left__content__bottom__date}>
                                <b>Talaba qo'shilgan sana:</b>
                                <p>30-May, 2024-yil 9:02</p>
                            </div>
                            <span className={styles.detail__left__content__bottom__btns}>
                                <button>
                                    <i className="fa-solid fa-arrow-up-from-bracket"></i>
                                    <p>Guruhga qo'shish</p>
                                </button>
                                <button>
                                    <i className="fa-solid fa-dollar-sign"></i>
                                    <p>To'lov </p>
                                </button>
                            </span>
                        </div>
                    </div>

                    <div className={styles.detail__left__note}>
                        <h3 className={styles.detail__left__note__title}>Eslatma</h3>
                        <button className={styles.detail__left__note__btn}><i className="fa-regular fa-flag"></i></button>
                    </div>
                </div>

                <div className={styles.detail__right}>
                    <div className={styles.detail__right__top}>
                        {attendanceData.map((item) => (
                            <span
                                key={item}
                                className={`${styles.left} ${activeItem === item ? styles.actAttendance : ''}`}
                                onClick={() => handleClick(item)}
                            >
                                <p className={styles.left}></p>
                                {item}
                                <p className={styles.right}></p>
                            </span>
                        ))}
                    </div>
                    <div className={styles.detail__right__content}>
                        <div className={styles.detail__right__content__body}>
                            {activeItem === "Guruhlar" && (data?.map((item) => (
                                <div key={item.id} className={styles.detail__right__content__body__item}>
                                    <div className={styles.detail__right__content__body__item__top}>
                                        <div className={styles.detail__right__content__body__item__top__title}>
                                            <span
                                                onClick={() => {
                                                    router.push("/group-detail")
                                                }}
                                            >{item.group}</span>
                                            <p>{item.activateDate}</p>
                                        </div>
                                        <div className={styles.detail__right__content__body__item__top__info}>
                                            <span>
                                                <b>Kurs:</b>
                                                <p>{item.course}</p>
                                            </span>
                                            <p>{item.endDate}</p>
                                        </div>
                                        <div className={styles.detail__right__content__body__item__top__info}>
                                            <span>
                                                <b>Ustoz:</b>
                                                <p>{item.teacher}</p>
                                            </span>
                                            <p>{item.oddDays ? "Toq kunlar" : "Juft kunlar"}</p>
                                        </div>
                                        <div className={styles.detail__right__content__body__item__top__info}>
                                            <span>
                                                <b>Guruh narxi:</b>
                                                <p>{item.groupPrice}</p>
                                            </span>
                                            <p>{item.schedule}</p>
                                        </div>
                                    </div>
                                    <div className={styles.detail__right__content__body__item__bottom}>
                                        <span className={styles.detail__right__content__body__item__bottom__info}>
                                            <b>Holat:</b>
                                            <p>{item.status}</p>
                                        </span>
                                        <span className={styles.detail__right__content__body__item__bottom__info}>
                                            <b>Talaba qo'shilgan sana:</b>
                                            <p>{item.addedDate}</p>
                                        </span>
                                        <span className={styles.detail__right__content__body__item__bottom__info}>
                                            <b>Faollashtirilgan:</b>
                                            <p>{item.activateDate}</p>
                                        </span>
                                        <span className={styles.detail__right__content__body__item__bottom__info}>
                                            <b>Bu talaba uchun narx:</b>
                                            <p>{item.studentPrice}</p>
                                        </span>
                                    </div>
                                </div>
                            )))}

                            {activeItem === "Izoh" && (
                                <div className={styles.detail__right__content__body__item}>
                                    <p>Izoh</p>
                                </div>
                            )}

                            {activeItem === "Qarzdorliklar tarixi" && (
                                <div className={styles.detail__right__content__body__item}>
                                    <p>Qarzdorliklar tarixi</p>
                                </div>
                            )}

                            {activeItem === "To'lovlar" && (
                                <div className={styles.detail__right__content__body__item}>
                                    <p>To'lovlar</p>
                                </div>
                            )}

                            {activeItem === "Tarixi" && (
                                <div className={styles.detail__right__content__body__item}>
                                    <p>Tarixi</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </LeftIntro>
    )
}

export default Detail;