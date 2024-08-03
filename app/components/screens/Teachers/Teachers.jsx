import Link from 'next/link'
import Image from 'next/image'
import styles from './Teachers.module.scss'
import { Context } from '@/app/components/ui/Context/Context';
import LeftIntro from '../../ui/Left/LeftIntro';
import { useContext, useState } from 'react';

const data = [
    {
        id: 1,
        name: "John",
        surname: "Doe",
        telephone: "123-456-7890",
        group: 10,
        profession: "Engineer",
    },
    {
        id: 2,
        name: "Jane",
        surname: "Smith",
        telephone: "987-654-3210",
        group: 10,
        profession: "Designer",
    },
    {
        id: 3,
        name: "Alice",
        surname: "Johnson",
        telephone: "555-123-4567",
        group: 10,
        profession: "Teacher",
    },
    {
        id: 4,
        name: "Bob",
        surname: "Brown",
        telephone: "444-555-6666",
        group: 10,
        profession: "Doctor",
    },
    {
        id: 5,
        name: "Charlie",
        surname: "Davis",
        telephone: "333-444-5555",
        group: 10,
        profession: "Lawyer",
    },
    {
        id: 6,
        name: "Emma",
        surname: "Wilson",
        telephone: "222-333-4444",
        group: 10,
        profession: "Architect",
    },
    {
        id: 7,
        name: "Michael",
        surname: "Clark",
        telephone: "111-222-3333",
        group: 10,
        profession: "Accountant",
    },
    {
        id: 8,
        name: "Olivia",
        surname: "Martinez",
        telephone: "666-777-8888",
        group: 10,
        profession: "Nurse",
    },
    {
        id: 9,
        name: "David",
        surname: "Garcia",
        telephone: "999-888-7777",
        group: 10,
        profession: "Scientist",
    },
    {
        id: 10,
        name: "Sophia",
        surname: "Anderson",
        telephone: "777-666-5555",
        group: 10,
        profession: "Artist",
    },
];

const Teachers = () => {
    const { lan } = useContext(Context);
    const [loader, setLoader] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };
    return (
        <LeftIntro>
            <div className={styles.teachers}>
                <div className={styles.teachers__table}>
                    <table>
                        <thead>
                            <tr>
                                <th>Ismi</th>
                                <th>Familiyasi</th>
                                <th>Telefoni</th>
                                <th>Guruhlar soni</th>
                                <th>Kasbi</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {!loader ? (
                                data?.map((item, key) => (
                                    <tr key={key} className={key % 2 === 0 ? styles.tableBc : ""}>
                                        <td>{item.name}</td>
                                        <td>{item.surname}</td>
                                        <td>{item.telephone}</td>
                                        <td>{item.group}-ta</td>
                                        <td><span>{item.profession}</span></td>

                                        <td className={styles.icon__list}>
                                            <button
                                                className={styles.icon__list__item}
                                                onClick={() => {
                                                    setEditModal(true);
                                                    setProductEditId(item.id);
                                                }}
                                            >
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                            <button
                                                className={styles.icon__list__item}
                                                style={{ backgroundColor: "red" }}
                                                onClick={() => {
                                                    setModalDelete(true);
                                                    setDelId(item.id);
                                                }}
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className={styles.skeleton__list}>
                                    <td className={styles.skeleton__list__item}></td>
                                    <td className={styles.skeleton__list__item}></td>
                                    <td className={styles.skeleton__list__item}></td>
                                    <td className={styles.skeleton__list__item}></td>
                                    <td className={styles.skeleton__list__item}></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
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
            </div>
        </LeftIntro>
    )
}

export default Teachers;