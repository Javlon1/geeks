import Link from 'next/link'
import Image from 'next/image'
import styles from './Detail.module.scss'
import { Context } from '@/app/components/ui/Context/Context';
import LeftIntro from '@/app/components/ui/Left/LeftIntro';
import { useContext, useState } from 'react';
const items = [
    {
        name: "Mukhammadjonov Javlon",
        phone: "998905251243",
        date: "2024-08-04",
    },
    {
        name: "Another Person",
        phone: "998901234567",
        date: "2024-08-05",
    },
    // Add more items as needed
];
const Detail = () => {
    const { lan } = useContext(Context);
    const [activePopUp, setActivePopUp] = useState(null);
    const togglePopUp = (index) => {
        setActivePopUp(activePopUp === index ? null : index);
    };

    return (
        <LeftIntro>
            <div className={styles.detail}>
                <div className={styles.detail__left}>
                    <div className={styles.detail__left__content}>
                        <div className={styles.detail__left__content__items}>
                            <div className={styles.detail__left__content__items__name}>
                                <b>Kurs kids Front-end</b>
                            </div>
                            <div className={styles.detail__left__content__items__title}>
                                <h3>Inter (D)</h3>
                                <p>Mukhammadjonov Javlon</p>
                            </div>
                            <span className={styles.mt}>
                                <b>Xolati:</b>
                                <p style={{ color: '#43ce48' }}>Aktiv</p>
                            </span>
                            <span>
                                <b>Narxi:</b>
                                <p>170000 UZS</p>
                            </span>
                            <span>
                                <b>Vaqti:</b>
                                <p>Juft kunlar 10:00</p>
                            </span>
                            <span className={styles.mt}>
                                <b>Xonasi:</b>
                                <p>4-xona</p>
                            </span>
                            <span>
                                <b>Mashg'ulotlar sanalari:</b>
                                <p>1-Noyabr, 2023-yil - 26-Oktabr, 2024-yil</p>
                            </span>
                        </div>
                        <div className={styles.detail__left__content__btns}>
                            <span>
                                <i className="fa-solid fa-pen"></i>
                            </span>
                            <span>
                                <i className="fa-solid fa-trash"></i>
                            </span>
                            <span>
                                <i className="fa-solid fa-square"></i>
                            </span>
                            <span>
                                <i className="fa-solid fa-plus"></i>
                            </span>
                            <span>
                                <i className="fa-solid fa-dollar-sign"></i>
                            </span>
                            <span>
                                <i className="fa-regular fa-envelope"></i>
                            </span>
                        </div>
                    </div>
                    <div className={styles.detail__left__notification}>
                        <h3 className={styles.detail__left__notification__title}>Eslatma</h3>
                        <button className={styles.detail__left__notification__btn}><i className="fa-regular fa-flag"></i></button>
                    </div>
                </div>

                <div className={styles.detail__right}>
                    {items.map((item, index) => (
                        <div className={styles.detail__right__content} key={index}>
                            <span className={styles.detail__right__content__name}>
                                {index + 1}. {item.name} <i className="fa-solid fa-check"></i>
                            </span>
                            <a className={styles.detail__right__content__phone} href={`tel:${item.phone}`}>
                                <i className="fa-solid fa-phone"></i>
                                {item.phone}
                            </a>
                            <button
                                onClick={() => togglePopUp(index)}
                                type="button"
                                className={styles.detail__right__content__btn}
                            >
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                            </button>

                            {activePopUp === index && (
                                <div className={styles.detail__right__content__popUp}>
                                    <ul className={styles.detail__right__content__popUp__list}>
                                        <li><i className="fa-solid fa-pause"></i>Muzlatish</li>
                                        <li><i className="fa-solid fa-dollar-sign"></i>To'lov</li>
                                        <li><i className="fa-regular fa-flag"></i>Yangi eslatma qo'shing</li>
                                        <li><i className="fa-solid fa-arrow-up-from-bracket"></i>Talabani gruhga o'tkazish</li>
                                        <li><i className="fa-solid fa-trash"></i>Gruhdan olib tashlash</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </LeftIntro>
    )
}

export default Detail;