import Link from 'next/link'
import Image from 'next/image'
import styles from './Students.module.scss'
import { Context } from '@/app/components/ui/Context/Context';
import LeftIntro from '../../ui/Left/LeftIntro';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import Select from "react-select";

const data = [
    {
        group: 'Back-end',
        teacher: 'John Doe',
        days: 'Toq kunlar',
        date: '2024-08-04',
        rooms: 'Room 101',
        students: 25,
        startTime: '09:00',
    },
    {
        group: 'Front-end',
        teacher: 'Jane Smith',
        days: 'Juft kunlar',
        date: '2024-08-05',
        rooms: 'Room 202',
        students: 30,
        startTime: '10:00',
    },
    {
        group: 'Back-end',
        teacher: 'Emily Johnson',
        days: 'Juft kunlar',
        date: '2024-08-06',
        rooms: 'Room 303',
        students: 20,
        startTime: '11:00',
    },
    {
        group: 'Front-end',
        teacher: 'Michael Brown',
        days: 'Toq kunlar',
        date: '2024-08-07',
        rooms: 'Room 404',
        students: 28,
        startTime: '01:00',
    },
    {
        group: 'Back-end',
        teacher: 'Jessica Davis',
        days: 'Juft kunlar',
        date: '2024-08-08',
        rooms: 'Room 505',
        students: 22,
        startTime: '02:00',
    }
];


const Students = () => {
    const router = useRouter();
    const { lan } = useContext(Context);
    const [loader, setLoader] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [addSGroup, setAddGroup] = useState(false);
    const [paymentData, setPaymentData] = useState([{ id: 1, name: 'Jony', }, { id: 2, name: 'Alex', }, { id: 3, name: 'Jasur', }, { id: 4, name: 'Saidjalol', }]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const productOptions = paymentData.map((item) => ({
        value: item.id,
        label: item.name,
    }));

    const [filters, setFilters] = useState({
        status: null,
        teacher: null,
        course: null,
        day: null,
    });

    const handleFilterChange = (selectedOption, { name }) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: selectedOption ? selectedOption.value : '',
        }));
    };

    const [formData, setFormData] = useState({
        name: '',
        course: null,
        teacher: null,
        days: null,
        room: null,
        startTime: '',
        startDate: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSelectChange = (name, selectedOption) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: selectedOption ? selectedOption.value : '',
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        setFormData({
            name: '',
            course: null,
            teacher: null,
            days: null,
            room: null,
            startTime: '',
            startDate: '',
        })
    };



    return (
        <LeftIntro>
            <div className={styles.students}>
                <div
                    className={`${styles.opacity} ${addSGroup ? styles.opacityAct : ""}`}
                    onClick={() => {
                        setAddGroup(false)
                    }}
                ></div>
                <button onClick={() => setAddGroup(true)} className={styles.students__btn} type='button'>Yangisnini qo'shish</button>
                <div className={styles.students__search}>
                    <div className={styles.students__search__select}>
                        <Select
                            name="status"
                            options={productOptions}
                            placeholder="Xolati bo'yicha"
                            onChange={handleFilterChange}
                            value={productOptions.find(option => option.value === filters.status)}
                            required
                        />
                    </div>
                    <div className={styles.students__search__select}>
                        <Select
                            name="teacher"
                            options={productOptions}
                            placeholder="Ustozi bo'yicha"
                            onChange={handleFilterChange}
                            value={productOptions.find(option => option.value === filters.teacher)}
                            required
                        />
                    </div>
                    <div className={styles.students__search__select}>
                        <Select
                            name="course"
                            options={productOptions}
                            placeholder="Kursi bo'yicha"
                            onChange={handleFilterChange}
                            value={productOptions.find(option => option.value === filters.course)}
                            required
                        />
                    </div>
                    <div className={styles.students__search__select}>
                        <Select
                            name="day"
                            options={productOptions}
                            placeholder="Kunlari bo'yicha"
                            onChange={handleFilterChange}
                            value={productOptions.find(option => option.value === filters.day)}
                            required
                        />
                    </div>

                    <button className={styles.students__search__btn}>Filterlash</button>
                </div>
                <div className={styles.students__items}>
                    <div className={styles.students__items__table}>
                        <div className={styles.students__items__table__header}>
                            <b>Guruh</b>
                            <b>O'qituvchi</b>
                            <b>Kunlar</b>
                            <b>Mashg'ulotlar sanalari</b>
                            <b>Xonalar</b>
                            <b>Talabalar</b>
                            <b></b>
                        </div>

                        <div className={styles.students__items__table__body}>
                            {!loader ? (
                                data?.map((item, key) => (
                                    <div key={key} className={styles.students__items__table__body__item}>
                                        <p
                                            onClick={() => {
                                                router.push(`/group-detail`);
                                            }}
                                        >{item.group}</p>
                                        <p><i className="fa-solid fa-chalkboard-user"></i> {item.teacher}</p>
                                        <div className={styles.students__items__table__body__item__date}>
                                            <b>{item.days}</b>
                                            <span><i className="fa-solid fa-clock"></i> {item.startTime}</span>
                                        </div>
                                        <p><i className="fa-solid fa-calendar-days"></i> {new Date(item.date).toLocaleDateString()}</p>
                                        <p>{item.rooms}</p>
                                        <p><i className="fa-solid fa-user-group"></i> {item.students}-ta</p>

                                        <span className={styles.icon__list}>
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
                                    <span className={styles.skeleton__list__item}></span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.students__pagination}>
                    <button
                        className={styles.students__pagination__btn}
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        <i className="fa-solid fa-angles-left"></i>
                    </button>

                    {Array.from({ length: itemsPerPage }, (_, index) => index + 1).map(
                        (page) => (
                            <button
                                className={`${styles.students__pagination__items} ${currentPage === page ? styles.act : ""
                                    }`}
                                key={page}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </button>
                        )
                    )}

                    <button
                        className={styles.students__pagination__btn}
                        onClick={handleNextPage}
                        disabled={currentPage === itemsPerPage}
                    >
                        <i className="fa-solid fa-angles-right"></i>
                    </button>
                </div>

                <div className={`${styles.students__register} ${addSGroup ? styles.registerAct : ""}`}>
                    <div style={{ display: addSGroup ? '' : 'none' }} className={styles.students__register__list}>
                        <div className={styles.students__register__list__header}>
                            <p>Guruh qo'shish</p>
                            <i onClick={() => setAddGroup(false)} className="fa-solid fa-x"></i>
                        </div> <form className={styles.students__register__list__form} onSubmit={handleSubmit}>
                            <label htmlFor="name">
                                <p>Nomi</p>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>

                            <label htmlFor="course">
                                <p>Kurs tanlash</p>
                                <Select
                                    name="course"
                                    options={productOptions}
                                    placeholder
                                    value={productOptions.find(option => option.value === formData.course)}
                                    onChange={(option) => handleSelectChange('course', option)}
                                    required
                                />
                            </label>

                            <label htmlFor="teacher">
                                <p>Ustozni tanlang</p>
                                <Select
                                    name="teacher"
                                    options={productOptions}
                                    placeholder
                                    value={productOptions.find(option => option.value === formData.teacher)}
                                    onChange={(option) => handleSelectChange('teacher', option)}
                                    required
                                />
                            </label>

                            <label htmlFor="days">
                                <p>Kunlar</p>
                                <Select
                                    name="days"
                                    options={productOptions}
                                    placeholder
                                    value={productOptions.find(option => option.value === formData.days)}
                                    onChange={(option) => handleSelectChange('days', option)}
                                    required
                                />
                            </label>

                            <label htmlFor="room">
                                <p>Xonani tanlang</p>
                                <Select
                                    name="room"
                                    options={productOptions}
                                    placeholder
                                    value={productOptions.find(option => option.value === formData.room)}
                                    onChange={(option) => handleSelectChange('room', option)}
                                    required
                                />
                            </label>

                            <label htmlFor="startTime">
                                <p>Darsning boshlanish vaqti</p>
                                <input
                                    type="time"
                                    name="startTime"
                                    value={formData.startTime}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>

                            <label htmlFor="startDate">
                                <p>Guruhni boshlanish sanasi</p>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                    required
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

export default Students;