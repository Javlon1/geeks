import styles from './LeftGroupIntro.module.scss'
import { Context } from '@/app/components/ui/Context/Context';
import LeftIntro from '../../../ui/Left/LeftIntro';
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

const LeftGroupIntro = () => {
    const { lan } = useContext(Context);

    const [loader, setLoader] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const [paymentData, setPaymentData] = useState([
        { id: 1, name: 'Jony' },
        { id: 2, name: 'Alex' },
        { id: 3, name: 'Jasur' },
        { id: 4, name: 'Saidjalol' }
    ]);

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

    const handleFiltersChange = (name, selectedOption) => {
        setFilters({
            ...filters,
            [name]: selectedOption,
        });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleFilter = () => {
        const appliedFilters = {
            status: filters.status ? filters.status.value : null,
            teacher: filters.teacher ? filters.teacher.value : null,
            course: filters.course ? filters.course.value : null,
            day: filters.day ? filters.day.value : null,
        };

        console.log('Applied Filters:', appliedFilters);
    };

    return (
        <LeftIntro>
            <div className={styles.leftGroupIntro}>
                <div className={styles.leftGroupIntro__search}>
                    <div className={styles.leftGroupIntro__search__select}>
                        <Select
                            name="status"
                            value={filters.status}
                            onChange={(selectedOption) => handleFiltersChange("status", selectedOption)}
                            options={productOptions}
                            placeholder="Ism yoki telefoni"
                            isClearable
                            required
                        />
                    </div>
                    <div className={styles.leftGroupIntro__search__select}>
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
                    <div className={styles.leftGroupIntro__search__select}>
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
                    <div className={styles.leftGroupIntro__search__select}>
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

                    <button className={styles.leftGroupIntro__search__btn} onClick={handleFilter}>
                        Filterlash
                    </button>
                </div>
                <div className={styles.leftGroupIntro__items}>
                    <div className={styles.leftGroupIntro__items__table}>
                        <div className={styles.leftGroupIntro__items__table__header}>
                            <b>Ism</b>
                            <b>Telefon</b>
                            <b>O'chirib tashlash sabablari</b>
                            <b>Balans</b>
                        </div>

                        <div className={styles.leftGroupIntro__items__table__body}>
                            {!loader ? (
                                data?.map((item, key) => (
                                    <div key={key} className={styles.leftGroupIntro__items__table__body__item}>
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
                                        <p>{item.teacher}</p>
                                        <p>{item.balance}</p>
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

                <div className={styles.leftGroupIntro__pagination}>
                    <button
                        className={styles.leftGroupIntro__pagination__btn}
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        <i className="fa-solid fa-angles-left"></i>
                    </button>

                    {Array.from({ length: itemsPerPage }, (_, index) => index + 1).map(
                        (page) => (
                            <button
                                className={`${styles.leftGroupIntro__pagination__items} ${currentPage === page ? styles.act : ""
                                    }`}
                                key={page}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </button>
                        )
                    )}

                    <button
                        className={styles.leftGroupIntro__pagination__btn}
                        onClick={handleNextPage}
                        disabled={currentPage === itemsPerPage}
                    >
                        <i className="fa-solid fa-angles-right"></i>
                    </button>
                </div>
            </div>
        </LeftIntro>
    )
}

export default LeftGroupIntro;