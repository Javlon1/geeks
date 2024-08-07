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


const Students = () => {
    const router = useRouter();
    const { lan } = useContext(Context);

    const [loader, setLoader] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [addSGroup, setAddGroup] = useState(false);
    const [addPayment, setAddPayment] = useState(false);
    const [editStudent, setEditStudent] = useState(false);
    const [send, setSend] = useState(false);

    const [paymentData, setPaymentData] = useState([
        { id: 1, name: 'Jony' },
        { id: 2, name: 'Alex' },
        { id: 3, name: 'Jasur' },
        { id: 4, name: 'Saidjalol' }
    ]);

    const [selectedPayment, setSelectedPayment] = useState(null);
    const [formPaymentData, setFormPaymentData] = useState({
        student: '',
        paymentMethod: '',
        amount: '',
        date: '',
        comment: ''
    });

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

    const [formData, setFormData] = useState({
        phone: '',
        firstName: '',
        lastName: '',
        course: null,
        group: null,
        notes: '',
    });

    const handleFiltersChange = (name, selectedOption) => {
        setFilters({
            ...filters,
            [name]: selectedOption,
        });
    };

    const handleProductChange = (selectedOption) => {
        setSelectedPayment(selectedOption);
        setFormPaymentData({
            ...formPaymentData,
            student: selectedOption ? selectedOption.value : ''
        });
    };

    const handlePaymentChange = (e) => {
        const { name, value } = e.target;
        setFormPaymentData({
            ...formPaymentData,
            [name]: value
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'phone' ? formatPhoneNumber(value) : value,
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

    const handleEditSubmit = (e) => {
        e.preventDefault();

        const dataToSubmit = {
            phone: formData.phone,
            firstName: formData.firstName,
            lastName: formData.lastName,
            status: filters.status ? filters.status.value : null,
            birthDate: formData.birthDate || '',
            notes: formData.notes,
        };

        console.log('Edit Data:', dataToSubmit);
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        console.log(formPaymentData);
        setAddPayment(false);
        setAddGroup(false);
        setSelectedPayment(null);
        setFormPaymentData({
            student: '',
            paymentMethod: '',
            amount: '',
            date: '',
            comment: ''
        });
    };

    const handleSMSSend = (e) => {
        e.preventDefault();
        console.log('Sending SMS:', {
            sender: 'Geeks Education',
            student: selectedPayment ? selectedPayment.label : 'All',
            message: formPaymentData.comment,
        });
        setSend(false);
        setSelectedPayment(null);
        setFormPaymentData({
            ...formPaymentData,
            comment: ''
        });
    };

    return (
        <LeftIntro>
            <div className={styles.students}>
                <div
                    className={`${styles.opacity} ${addSGroup || addPayment || editStudent || send ? styles.opacityAct : ""}`}
                    onClick={() => {
                        setAddGroup(false)
                        setAddPayment(false)
                        setEditStudent(false)
                        setSend(false)
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
                            <span
                                onClick={() => {
                                    setSend(true)
                                }}
                            >
                                <i className="fa-regular fa-envelope"></i>
                            </span>
                        </div>

                        <div className={styles.students__items__table__body}>
                            {!loader ? (
                                data?.map((item, key) => (
                                    <div key={key} className={styles.students__items__table__body__item}>
                                        <p
                                            onClick={() => {
                                                router.push(`/student-detail`);
                                            }}
                                        >
                                            <i className="fa-solid fa-user"></i>
                                            {item.lastName} {item.firstName}
                                        </p>
                                        <p>
                                            <a href={`tel:${item.phone}`}>
                                                <i className="fa-solid fa-phone"></i>
                                                {item.phone}
                                            </a>
                                        </p>
                                        <div className={styles.students__items__table__body__item__group}>
                                            <b
                                                onClick={() => {
                                                    router.push(`/group-detail`);
                                                }}
                                            >
                                                {item.group}
                                            </b>
                                            <p className={styles.element}><span>Qo'shildi:</span> {item.activateDate}</p>
                                            <p className={styles.element}><span>Aktivlashtrildi:</span> {item.startedDate}</p>
                                            <p className={styles.element}><span>Chiqarildi :</span> -</p>
                                        </div>
                                        <p className={styles.students__items__table__body__item__teacher}><i className="fa-solid fa-chalkboard-user"></i> {item.teacher}</p>
                                        <p>{item.balance}</p>

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
                                                onClick={() => {
                                                    setAddPayment(true);
                                                }}
                                                className={styles.icon__list__item}
                                            >
                                                <i className="fa-solid fa-dollar-sign"></i>
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

                <div
                    className={`${styles.students__register} ${addSGroup || addPayment || editStudent || send ? styles.registerAct : ''
                        }`}
                >
                    <div
                        style={{ display: addSGroup ? '' : 'none' }}
                        className={styles.students__register__list}
                    >
                        <div className={styles.students__register__list__header}>
                            <p>O`quvchi qo'shish</p>
                            <i onClick={() => setAddGroup(false)} className="fa-solid fa-x"></i>
                        </div>
                        <form
                            className={styles.students__register__list__form}
                            onSubmit={handleSubmit}
                        >
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
                                    onChange={(selectedOption) =>
                                        handleSelectChange('course', selectedOption)
                                    }
                                    options={productOptions}
                                    placeholder
                                    isClearable
                                    required
                                />
                            </label>

                            <label htmlFor="group">
                                <p>Qaysi guruhga ?:</p>
                                <Select
                                    name="group"
                                    value={formData.group}
                                    onChange={(selectedOption) =>
                                        handleSelectChange('group', selectedOption)
                                    }
                                    options={productOptions}
                                    placeholder
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

                    <div
                        style={{ display: editStudent ? '' : 'none' }}
                        className={styles.students__register__list}
                    >
                        <div className={styles.students__register__list__header}>
                            <p>O`quvchini tahrirlash</p>
                            <i onClick={() => setEditStudent(false)} className="fa-solid fa-x"></i>
                        </div>
                        <form
                            className={styles.students__register__list__form}
                            onSubmit={handleEditSubmit}
                        >
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

                            <label htmlFor="status">
                                <p>Status:</p>
                                <Select
                                    name="status"
                                    value={filters.status}
                                    onChange={(selectedOption) =>
                                        handleFiltersChange('status', selectedOption)
                                    }
                                    options={productOptions}
                                    placeholder
                                    isClearable
                                    required
                                />
                            </label>

                            <label htmlFor="birthDate">
                                <p>Tug'ilgan sana:</p>
                                <input
                                    type="date"
                                    name="birthDate"
                                    value={formData.birthDate || ''}
                                    onChange={handleChange}
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

                    <div
                        style={{ display: addPayment ? '' : 'none' }}
                        className={styles.students__register__list}
                    >
                        <div className={styles.students__register__list__header}>
                            <p>To'lov qo'shish</p>
                            <i onClick={() => setAddPayment(false)} className="fa-solid fa-x"></i>
                        </div>
                        <form
                            className={styles.students__register__list__form}
                            onSubmit={handlePaymentSubmit}
                        >
                            <label htmlFor="student">
                                <p>Talaba:</p>
                                <Select
                                    options={productOptions}
                                    placeholder
                                    value={selectedPayment}
                                    onChange={handleProductChange}
                                    isClearable
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

                    <div
                        style={{ display: send ? '' : 'none' }}
                        className={styles.students__register__list}
                    >
                        <div className={styles.students__register__list__header}>
                            <p>Talabalarga SMS yuborish</p>
                            <i onClick={() => setSend(false)} className="fa-solid fa-x"></i>
                        </div>
                        <form
                            className={styles.students__register__list__form}
                            onSubmit={handleSMSSend}
                        >
                            <p>Yuboruvchi: Geeks Education</p>
                            <label htmlFor="student">
                                <p>Talaba:</p>
                                <Select
                                    options={productOptions}
                                    placeholder
                                    value={selectedPayment}
                                    onChange={handleProductChange}
                                    isClearable
                                    required
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
            </div>
        </LeftIntro>
    )
}

export default Students;