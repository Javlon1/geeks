import Link from 'next/link'
import Image from 'next/image'
import styles from './Detail.module.scss'
import { Context } from '@/app/components/ui/Context/Context';
import LeftIntro from '@/app/components/ui/Left/LeftIntro';
import { useContext, useState } from 'react';


const Detail = () => {
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
                        <div className={styles.detail__right__content__header}>
                            <h3>{activeItem}</h3>
                        </div>

                    </div>
                </div>
            </div>
        </LeftIntro>
    )
}

export default Detail;