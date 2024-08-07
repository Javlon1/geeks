import Link from 'next/link'
import Image from 'next/image'
import styles from './Detail.module.scss'
import { Context } from '@/app/components/ui/Context/Context';
import LeftIntro from '@/app/components/ui/Left/LeftIntro';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
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
    const attendanceData = ['Guruhlar', 'Izoh', 'Qarzdorliklar tarixi', "To'lovlar"];
    const [addPayment, setAddPayment] = useState(false);
    const [editStudent, setEditStudent] = useState(false);
    const [send, setSend] = useState(false);

    const handleClick = (item) => {
        setActiveItem(item);
    };

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
            <div className={styles.detail}>
                <div
                    className={`${styles.opacity} ${addPayment || editStudent || send ? styles.opacityAct : ""}`}
                    onClick={() => {
                        setAddPayment(false)
                        setEditStudent(false)
                        setSend(false)
                    }}
                ></div>
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
                            <button
                                onClick={() => setEditStudent(true)}
                            >
                                <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button
                                onClick={() => setSend(true)}
                            >
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
                                <button
                                    onClick={() => setAddPayment(true)}
                                >
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
                                <div className={styles.detail__right__content__body__items}>
                                    <div className={styles.detail__right__content__body__items__table}>
                                        <div className={styles.detail__right__content__body__items__table__header}>
                                            <b>Izoh</b>
                                            <b>Xodim</b>
                                            <b>Sana</b>
                                        </div>

                                        <div className={styles.detail__right__content__body__items__table__body}>
                                            {data?.map((item, key) => (
                                                <div key={key} className={styles.detail__right__content__body__items__table__body__item}>
                                                    <p>{item.endDate}</p>
                                                    <p>{item.teacher}</p>
                                                    <p>{item.startedDate}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeItem === "Qarzdorliklar tarixi" && (
                                <div className={styles.detail__right__content__body__items}>
                                    <div className={`${styles.detail__right__content__body__items__table} ${styles.indebtednessTable}`}>
                                        <div className={`${styles.detail__right__content__body__items__table__header} ${styles.indebtedness}`}>
                                            <b>Sana</b>
                                            <b>Miqdor</b>
                                            <b>To'landi</b>
                                            <b>Izoh</b>
                                            <b>Xodim</b>
                                            <b></b>
                                        </div>

                                        <div className={styles.detail__right__content__body__items__table__body}>
                                            {data?.map((item, key) => (
                                                <div key={key} className={`${styles.detail__right__content__body__items__table__body__item} ${styles.indebtedness}`}>
                                                    <p>{item.startedDate}</p>
                                                    <p>{item.balance}</p>
                                                    <p>{item.balance}</p>
                                                    <p>{item.endDate}</p>
                                                    <p>{item.teacher}</p>

                                                    <span className={styles.icon__list}>
                                                        <button
                                                            onClick={() => {
                                                                // setEditStudent(true);
                                                            }}
                                                            className={styles.icon__list__item}
                                                        >
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                // setAddPayment(true);
                                                            }}
                                                            className={styles.icon__list__item}
                                                        >
                                                            <i className="fa-solid fa-print"></i>
                                                        </button>
                                                        <button
                                                            className={styles.icon__list__item}
                                                        >
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button>
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeItem === "To'lovlar" && (
                                <div className={styles.detail__right__content__body__items}>
                                    <div className={`${styles.detail__right__content__body__items__table} ${styles.indebtednessTable}`}>
                                        <div className={`${styles.detail__right__content__body__items__table__header} ${styles.indebtedness}`}>
                                            <b>Sana</b>
                                            <b>Miqdor</b>
                                            <b>Turi</b>
                                            <b>Izoh</b>
                                            <b>Xodim</b>
                                            <b></b>
                                        </div>

                                        <div className={styles.detail__right__content__body__items__table__body}>
                                            {data?.map((item, key) => (
                                                <div key={key} className={`${styles.detail__right__content__body__items__table__body__item} ${styles.indebtedness}`}>
                                                    <p>{item.startedDate}</p>
                                                    <p>{item.balance}</p>
                                                    <p>{item.balance}</p>
                                                    <p>{item.endDate}</p>
                                                    <p>{item.teacher}</p>

                                                    <span className={styles.icon__list}>
                                                        <button
                                                            onClick={() => {
                                                                // setEditStudent(true);
                                                            }}
                                                            className={styles.icon__list__item}
                                                        >
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                // setAddPayment(true);
                                                            }}
                                                            className={styles.icon__list__item}
                                                        >
                                                            <i className="fa-solid fa-print"></i>
                                                        </button>
                                                        <button
                                                            className={styles.icon__list__item}
                                                        >
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button>
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div
                    className={`${styles.detail__register} ${addPayment || editStudent || send? styles.registerAct : ''
                        }`}
                >
                    <div
                        style={{ display: editStudent ? '' : 'none' }}
                        className={styles.detail__register__list}
                    >
                        <div className={styles.detail__register__list__header}>
                            <p>O`quvchini tahrirlash</p>
                            <i onClick={() => setEditStudent(false)} className="fa-solid fa-x"></i>
                        </div>
                        <form
                            className={styles.detail__register__list__form}
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
                        className={styles.detail__register__list}
                    >
                        <div className={styles.detail__register__list__header}>
                            <p>To'lov qo'shish</p>
                            <i onClick={() => setAddPayment(false)} className="fa-solid fa-x"></i>
                        </div>
                        <form
                            className={styles.detail__register__list__form}
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
                        className={styles.detail__register__list}
                    >
                        <div className={styles.detail__register__list__header}>
                            <p>Talabalarga SMS yuborish</p>
                            <i onClick={() => setSend(false)} className="fa-solid fa-x"></i>
                        </div>
                        <form
                            className={styles.detail__register__list__form}
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

export default Detail;