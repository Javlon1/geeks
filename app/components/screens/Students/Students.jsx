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

    const formatPhoneNumber = (number) => {
        let newValue = number.replace(/\D/g, '');

        if (!newValue.startsWith('998')) {
            newValue = '998' + newValue;
        }

        if (newValue.length > 12) {
            newValue = newValue.slice(0, 12);
        }

        if (newValue.length > 3) newValue = newValue.replace(/^(\d{3})(\d+)/, '$1 $2');
        if (newValue.length > 6) newValue = newValue.replace(/^(\d{3}) (\d{2})(\d+)/, '$1 $2 $3');
        if (newValue.length > 9) newValue = newValue.replace(/^(\d{3}) (\d{2}) (\d{3})(\d+)/, '$1 $2 $3 $4');
        if (newValue.length > 11) newValue = newValue.replace(/^(\d{3}) (\d{2}) (\d{3}) (\d{2})(\d+)/, '$1 $2 $3 $4 $5');

        return newValue.trim();
    };

    const [filters, setFilters] = useState({
        status: null,
        teacher: null,
        course: null,
        day: null,
    });

    const handleFiltersChange = (name, selectedOption) => {
        setFilters({
            ...filters,
            [name]: selectedOption,
        });
    };


    const handleFilter = () => {
        const appliedFilters = {
            status: filters.status ? filters.status.value : null,
            teacher: filters.teacher ? filters.teacher.value : null,
            course: filters.course ? filters.course.value : null,
            day: filters.day ? filters.day.value : null,
        };

        console.log("Applied Filters:", appliedFilters);
    };

    const [formData, setFormData] = useState({
        phone: "",
        firstName: "",
        lastName: "",
        course: null,
        group: null,
        notes: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "phone" ? formatPhoneNumber(value) : value,
        }));
    };


    const handleSelectChange = (name, selectedOption) => {
        setFormData({
            ...formData,
            [name]: selectedOption,
        });
    };



    const handleSubmit = (e) => {
        e.preventDefault();

        const dataToSubmit = {
            phone: formData.phone,
            firstName: formData.firstName,
            lastName: formData.lastName,
            course: formData.course ? formData.course.value : null,
            group: formData.group ? formData.group.value : null,
            notes: formData.notes,
        };

        console.log(dataToSubmit);
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
                            value={filters.status}
                            onChange={(selectedOption) => handleFiltersChange("status", selectedOption)}
                            options={productOptions}
                            placeholder="Ism yoki telefon"
                            isClearable
                            required
                        />
                    </div>
                    <div className={styles.students__search__select}>
                        <Select
                            name="teacher"
                            value={filters.teacher}
                            onChange={(selectedOption) => handleFiltersChange("teacher", selectedOption)}
                            options={productOptions}
                            placeholder="Kurs"
                            isClearable
                            required
                        />
                    </div>
                    <div className={styles.students__search__select}>
                        <Select
                            name="course"
                            value={filters.course}
                            onChange={(selectedOption) => handleFiltersChange("course", selectedOption)}
                            options={productOptions}
                            placeholder="Talaba holati"
                            isClearable
                            required
                        />
                    </div>
                    <div className={styles.students__search__select}>
                        <Select
                            name="day"
                            value={filters.day}
                            onChange={(selectedOption) => handleFiltersChange("day", selectedOption)}
                            options={productOptions}
                            placeholder="Moliyaviy holati"
                            isClearable
                            required
                        />
                    </div>

                    <button className={styles.students__search__btn} onClick={handleFilter}>
                        Filterlash
                    </button>
                </div>
                <div className={styles.students__items}>
                    <div className={styles.students__items__table}>
                        <div className={styles.students__items__table__header}>
                            <b>Ism</b>
                            <b>Telefon</b>
                            <b>Guruhlar</b>
                            <b>	O'qituvchilar</b>
                            <b>Balans</b>
                            <span>
                                <i className="fa-regular fa-envelope"></i>
                            </span>
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
                                            <button
                                                className={styles.icon__list__item}
                                            >
                                                <i className="fa-solid fa-trash"></i>
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
                            <p>O`quvchi qo'shish</p>
                            <i onClick={() => setAddGroup(false)} className="fa-solid fa-x"></i>
                        </div>
                        <form className={styles.students__register__list__form} onSubmit={handleSubmit}>
                            <label htmlFor="phone">
                                <p>Telefon:</p>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            <label htmlFor="firstName">
                                <p>Ism:</p>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            <label htmlFor="lastName">
                                <p>Familya:</p>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            <label htmlFor="course">
                                <p>Qaysi kursga ?:</p>
                                <Select
                                    name="course"
                                    value={formData.course}
                                    onChange={(selectedOption) => handleSelectChange("course", selectedOption)}
                                    options={productOptions}
                                    placeholder="Select Course"
                                    isClearable
                                    required
                                />
                            </label>

                            <label htmlFor="group">
                                <p>Qaysi guruhga ?:</p>
                                <Select
                                    name="group"
                                    value={formData.group}
                                    onChange={(selectedOption) => handleSelectChange("group", selectedOption)}
                                    options={productOptions}
                                    placeholder="Select Group"
                                    isClearable
                                    required
                                />
                            </label>

                            <label htmlFor="notes">
                                <p>Izoh:</p>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    cols="30"
                                    rows="10"
                                ></textarea>
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