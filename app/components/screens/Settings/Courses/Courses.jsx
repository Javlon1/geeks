import styles from './Courses.module.scss'
import { Context } from '@/app/components/ui/Context/Context';
import LeftIntro from '@/app/components/ui/Left/LeftIntro';
import { useContext, useState } from 'react';
import Select from "react-select";

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
        balance: "5000000"
    },
    {
        id: 2,
        firstName: "Akmal",
        lastName: "Karimov",
        phone: "+998903451267",
        group: "Back-end",
        activateDate: "01.04.2023",
        startedDate: "02.06.2023",
        teacher: "Saidov Timur",
        balance: "3500000"
    },
    {
        id: 3,
        firstName: "Dilnoza",
        lastName: "Akhmedova",
        phone: "+998933211245",
        group: "Data Science",
        activateDate: "15.05.2023",
        startedDate: "18.07.2023",
        teacher: "Sharipova Umida",
        balance: "4200000"
    },
    {
        id: 4,
        firstName: "Rustam",
        lastName: "Abdullayev",
        phone: "+998912341234",
        group: "Cybersecurity",
        activateDate: "20.06.2023",
        startedDate: "25.08.2023",
        teacher: "Nematov Aziz",
        balance: "6000000"
    },
    {
        id: 5,
        firstName: "Madina",
        lastName: "Ismailova",
        phone: "+998914561238",
        group: "Mobile Development",
        activateDate: "10.07.2023",
        startedDate: "12.09.2023",
        teacher: "Rahimov Davron",
        balance: "4800000"
    }
];

const Courses = () => {
    const { lan } = useContext(Context);
    const [loader, setLoader] = useState(false);
    const [addCourses, setAddCourses] = useState(false);


    const [paymentData, setPaymentData] = useState([{ id: 1, name: 'Jony', }, { id: 2, name: 'Alex', }, { id: 3, name: 'Jasur', }, { id: 4, name: 'Saidjalol', }]);
    const [selectedPayment, setSelectedPayment] = useState(null);

    const productOptions = paymentData.map((item) => ({
        value: item.id,
        label: item.name,
    }));


    return (
        <LeftIntro>
            <div className={styles.courses}>
                <div
                    className={`${styles.opacity} ${addCourses ? styles.opacityAct : ""}`}
                    onClick={() => {
                        setAddCourses(false)
                    }}
                ></div>
                <button onClick={() => setAddCourses(true)} className={styles.courses__btn} type='button'>Yangisnini qo'shish</button>
                <div className={styles.courses__items}>
                    <div className={styles.courses__items__table}>
                        <div className={styles.courses__items__table__header}>
                            <b>№</b>
                            <b>Nomi</b>
                            <b></b>
                        </div>

                        <div className={styles.courses__items__table__body}>
                            {!loader ? (
                                data?.map((item, key) => (
                                    <div key={key} className={styles.courses__items__table__body__item}>
                                        <p>
                                            <i className="fa-solid fa-user"></i>
                                            {item.lastName} {item.firstName}
                                        </p>
                                        <p>
                                            <a href={`tel:${item.phone}`}>
                                                <i className="fa-solid fa-phone"></i>
                                                {item.phone}
                                            </a>
                                        </p>

                                        <span className={styles.icon__list}>
                                            <button
                                                onClick={() => {
                                                    setEditStudent(true);
                                                }}
                                                className={styles.icon__list__item}
                                            >
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                            <button
                                                className={styles.icon__list__item}
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className={styles.skeleton__list}>
                                    <span className={styles.skeleton__list__item}></span>
                                    <span className={styles.skeleton__list__item}></span>
                                    <span className={styles.skeleton__list__item}></span>
                                    <span className={styles.skeleton__list__item}></span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div
                    className={`${styles.courses__register} ${addCourses ? styles.registerAct : ''}`}
                >
                    <div
                        style={{ display: addCourses ? '' : 'none' }}
                        className={styles.courses__register__list}
                    >
                        <div className={styles.courses__register__list__header}>
                            <p>Kurslar qo'shish</p>
                            <i onClick={() => setAddCourses(false)} className="fa-solid fa-x"></i>
                        </div>
                        <form
                            className={styles.courses__register__list__form}
                        >
                            <label>
                                <p>Kurs nomi:</p>
                                <input
                                    type="text"
                                    required
                                />
                            </label>

                            <label htmlFor="student">
                                <p>Dars davomiyligi:</p>
                                <Select
                                    options={productOptions}
                                    placeholder
                                    required
                                />
                            </label>

                            <label>
                                <p>Kurs davomiyligi (oylarda):</p>
                                <input
                                    type="number"
                                    required
                                />
                            </label>

                            <label>
                                <p>Narxi:</p>
                                <input
                                    type="number"
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
                </div>
            </div>
        </LeftIntro>
    )
}

export default Courses;