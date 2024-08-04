import Link from 'next/link'
import Image from 'next/image'
import styles from './Teachers.module.scss'
import { Context } from '@/app/components/ui/Context/Context';
import LeftIntro from '../../ui/Left/LeftIntro';
import { useContext, useState } from 'react';
import userImg from '../../../../public/img/me.jpg';

const data = [
    {
        id: 1,
        name: "John",
        surname: "Doe",
        telephone: "123-456-7890",
        birthday: "03.05.2003",
        group: 10,
        profession: "Front-end",
    },
    {
        id: 2,
        name: "Jane",
        surname: "Smith",
        telephone: "987-654-3210",
        birthday: "03.05.2003",
        group: 10,
        profession: "Back-end",
    },
    {
        id: 3,
        name: "Alice",
        surname: "Johnson",
        telephone: "555-123-4567",
        birthday: "03.05.2003",
        group: 10,
        profession: "Front-end",
    },
    {
        id: 4,
        name: "Bob",
        surname: "Brown",
        telephone: "444-555-6666",
        birthday: "03.05.2003",
        group: 10,
        profession: "Back-end",
    },
    {
        id: 5,
        name: "Charlie",
        surname: "Davis",
        telephone: "333-444-5555",
        birthday: "03.05.2003",
        group: 10,
        profession: "Front-end",
    },
    {
        id: 6,
        name: "Emma",
        surname: "Wilson",
        telephone: "222-333-4444",
        birthday: "03.05.2003",
        group: 10,
        profession: "Back-end",
    },
    {
        id: 7,
        name: "Michael",
        surname: "Clark",
        telephone: "111-222-3333",
        birthday: "03.05.2003",
        group: 10,
        profession: "Front-end",
    },
    {
        id: 8,
        name: "Olivia",
        surname: "Martinez",
        telephone: "666-777-8888",
        birthday: "03.05.2003",
        group: 10,
        profession: "Back-end",
    },
    {
        id: 9,
        name: "David",
        surname: "Garcia",
        telephone: "999-888-7777",
        birthday: "03.05.2003",
        group: 10,
        profession: "Front-end",
    },
    {
        id: 10,
        name: "Sophia",
        surname: "Anderson",
        telephone: "777-666-5555",
        birthday: "03.05.2003",
        group: 10,
        profession: "Back-end",
    },
];

const Teachers = () => {
    const { lan } = useContext(Context);
    const [loader, setLoader] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [addSTeacher, setAddTeacher] = useState(false);
    const [editTeacher, setEditTeacher] = useState(false);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        birthDate: '',
        profession: '',
        password: '',
        confirmPassword: ''
    });

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

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: formatPhoneNumber(value)
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);
        
        setFormData({
            firstName: '',
            lastName: '',
            phone: '',
            birthDate: '',
            profession: '',
            password: '',
            confirmPassword: ''
        });
    };

    return (
        <LeftIntro>
            <div className={styles.teachers}>
                <div
                    className={`${styles.opacity} ${addSTeacher || editTeacher ? styles.opacityAct : ""}`}
                    onClick={() => {
                        setAddTeacher(false)
                        setEditTeacher(false)
                    }}
                ></div>
                <button onClick={() => setAddTeacher(true)} className={styles.teachers__btn} type='button'>Yangisnini qo'shish</button>
                <div className={styles.teachers__items}>
                    <div className={styles.teachers__items__table}>
                        <div className={styles.teachers__items__table__header}>
                            <b>F.I.O</b>
                            <b>Telefoni</b>
                            <b>Tugilgan sanasi</b>
                            <b>Guruhlar soni</b>
                            <b>Kasbi</b>
                        </div>

                        <div className={styles.teachers__items__table__body}>
                            {!loader ? (
                                data?.map((item, key) => (
                                    <div key={key} className={styles.teachers__items__table__body__item}>
                                        <p>
                                            <Image
                                                src={userImg}
                                                alt="user"
                                                width={45}
                                                height={45}
                                                priority
                                            />
                                            {item.name}
                                            {item.surname}
                                        </p>
                                        <p>
                                            <a href={`tel:${item.telephone}`}>
                                                <i className="fa-solid fa-phone"></i>
                                                {item.telephone}
                                            </a>
                                        </p>
                                        <p>
                                            <i className="fa-solid fa-calendar-days"></i>
                                            {item.birthday}
                                        </p>
                                        <p>
                                            <i className="fa-solid fa-layer-group"></i>
                                            {item.group}-ta
                                        </p>
                                        <p><span style={{ backgroundColor: item.profession === "Front-end" ? "#9A9CA1" : "#9A9CA1" }}>{item.profession}</span></p>

                                        <span className={styles.icon__list}>
                                            <button
                                                className={styles.icon__list__item}
                                                onClick={() => {
                                                    setEditTeacher(true);
                                                }}
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
                                    <span className={styles.skeleton__list__item}></span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.teachers__pagination}>
                    <button
                        className={styles.teachers__pagination__btn}
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        <i className="fa-solid fa-angles-left"></i>
                    </button>

                    {Array.from({ length: itemsPerPage }, (_, index) => index + 1).map(
                        (page) => (
                            <button
                                className={`${styles.teachers__pagination__items} ${currentPage === page ? styles.act : ""
                                    }`}
                                key={page}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </button>
                        )
                    )}

                    <button
                        className={styles.teachers__pagination__btn}
                        onClick={handleNextPage}
                        disabled={currentPage === itemsPerPage}
                    >
                        <i className="fa-solid fa-angles-right"></i>
                    </button>
                </div>

                <div className={`${styles.teachers__register} ${addSTeacher || editTeacher ? styles.registerAct : ""}`}>
                    <div style={{ display: addSTeacher ? '' : 'none' }} className={styles.teachers__register__list}>
                        <div className={styles.teachers__register__list__header}>
                            <p>Ustoz qo'shish</p>
                            <i onClick={() => setAddTeacher(false)} className="fa-solid fa-x"></i>
                        </div>
                        <form className={styles.teachers__register__list__form} onSubmit={handleSubmit}>
                            <label htmlFor="">
                                <p>Ismi</p>
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                            </label>
                            <label htmlFor="">
                                <p>Familiyasi</p>
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                            </label>
                            <label htmlFor="">
                                <p>Telefoni:</p>
                                <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                            </label>
                            <label htmlFor="">
                                <p>Tug'ilgan sanasi:</p>
                                <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
                            </label>
                            <label htmlFor="">
                                <p>Kasbi:</p>
                                <input type="text" name="profession" value={formData.profession} onChange={handleChange} />
                            </label>
                            <label htmlFor="">
                                <p>Parol:</p>
                                <input type="text" name="password" value={formData.password} onChange={handleChange} />
                            </label>

                            <button type="submit">Yuborish</button>
                        </form>
                    </div>
                    <div style={{ display: editTeacher ? '' : 'none' }} className={styles.teachers__register__list}>
                        <div className={styles.teachers__register__list__header}>
                            <p>Ustozni taxrirlash</p>
                            <i onClick={() => setEditTeacher(false)} className="fa-solid fa-x"></i>
                        </div>
                        <form className={styles.teachers__register__list__form} onSubmit={handleSubmit}>
                            <label htmlFor="">
                                <p>Ismi</p>
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                            </label>
                            <label htmlFor="">
                                <p>Familiyasi</p>
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                            </label>
                            <label htmlFor="">
                                <p>Telefoni:</p>
                                <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                            </label>
                            <label htmlFor="">
                                <p>Tug'ilgan sanasi:</p>
                                <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
                            </label>
                            <label htmlFor="">
                                <p>Kasbi:</p>
                                <input type="text" name="profession" value={formData.profession} onChange={handleChange} />
                            </label>
                            <label htmlFor="">
                                <p>Parol:</p>
                                <input type="text" name="password" value={formData.password} onChange={handleChange} />
                            </label>

                            <button type="submit">Yuborish</button>
                        </form>
                    </div>
                </div>
            </div>
        </LeftIntro>
    )
}

export default Teachers;