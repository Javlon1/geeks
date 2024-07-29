import styles from './LidsIntro.module.scss'
import { Context } from '@/app/components/ui/Context/Context';
import { useContext, useEffect, useState } from 'react';
import LeftIntro from '../../ui/Left/LeftIntro';
import Select from "react-select";


const LidsIntro = () => {
    const { url } = useContext(Context);
    const [addStudent, setAddStudent] = useState(false);
    const [addCollection, setAddCollection] = useState(false);

    const [CollectionData, setCollectionData] = useState([{ id: 1, name: 'Jony', }, { id: 2, name: 'Alex', }, { id: 3, name: 'Jasur', }, { id: 4, name: 'Saidjalol', }]);
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [formCollectionData, setFormCollectionData] = useState({
        student: '',
        CollectionMethod: '',
        amount: '',
        date: '',
        comment: ''
    });

    useEffect(() => {
        // Fetch product data from your API and update state
        // Example: fetchProducts();
    }, []);

    const handleProductChange = (selectedOption) => {
        setSelectedCollection(selectedOption);
        setFormCollectionData({
            ...formCollectionData,
            student: selectedOption ? selectedOption.value : ''
        });
    };

    const productOptions = CollectionData.map((item) => ({
        value: item.id,
        label: item.name,
    }));

    const handleCollectionChange = (e) => {
        const { name, value } = e.target;
        setFormCollectionData({
            ...formCollectionData,
            [name]: value
        });
    };

    const handleCollectionSubmit = async (e) => {
        e.preventDefault();
        console.log(formCollectionData);
        setAddCollection(false);
        setAddStudent(false);
        setSelectedCollection(null);
        setFormCollectionData({
            student: '',
            CollectionMethod: '',
            amount: '',
            date: '',
            comment: ''
        })
    };
    return (
        <section className={styles.lidsIntro}>
            <div
                className={`${styles.opacity} ${addStudent || addCollection ? styles.opacityAct : ""}`}
                onClick={() => {
                    setAddStudent(false)
                    setAddCollection(false)
                }}
            ></div>
            <LeftIntro>
                <div className={styles.lidsIntro__items}>
                    <div className={styles.lidsIntro__items__left}>
                        <div className={styles.lidsIntro__items__left__header}>
                            <span>
                                <b>So'rovlar</b>
                                <p>(33)</p>
                            </span>
                            <p onClick={() => setAddStudent(true)} className={styles.icon}>
                                <i className="fa-solid fa-plus"></i>
                            </p>
                        </div>
                        <div className={styles.lidsIntro__items__left__body}>

                        </div>
                    </div>
                    <div className={styles.lidsIntro__items__right}>
                        <div className={styles.lidsIntro__items__right__header}>
                            <span>
                                <b>To'plamlar</b>
                                <p>(33)</p>
                            </span>
                            <p onClick={() => setAddCollection(true)} className={styles.icon}>
                                <i className="fa-solid fa-plus"></i>
                            </p>
                        </div>
                        <div className={styles.lidsIntro__items__right__body}>

                        </div>
                    </div>
                </div>

                <div className={`${styles.lidsIntro__register} ${addStudent || addCollection ? styles.registerAct : ""}`}>
                    <div style={{ display: addStudent ? '' : 'none' }} className={styles.lidsIntro__register__list}>
                        <div className={styles.lidsIntro__register__list__header}>
                            <p>So'rovlar</p>
                            <i onClick={() => setAddStudent(false)} className="fa-solid fa-x"></i>
                        </div>
                        <form className={styles.lidsIntro__register__list__form}>
                            <label htmlFor="">
                                <p>Ismi</p>
                                <input type="text" />
                            </label>
                            <label htmlFor="">
                                <p>Familiyasi</p>
                                <input type="text" />
                            </label>
                            <label htmlFor="">
                                <p>Telefoni:</p>
                                <input type="text" />
                            </label>
                            <label htmlFor="">
                                <p>Telefoni:</p>
                                <input type="text" />
                            </label>
                            <label htmlFor="student">
                                <p>Qaysi kursga:</p>
                                <Select
                                    options={productOptions}
                                    placeholder
                                    value={selectedCollection}
                                    onChange={handleProductChange}
                                    required
                                />
                            </label>
                            <label htmlFor="student">
                                <p>Qaerdan:</p>
                                <Select
                                    options={productOptions}
                                    placeholder
                                    value={selectedCollection}
                                    onChange={handleProductChange}
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
                    <div style={{ display: addCollection ? '' : 'none' }} className={styles.lidsIntro__register__list}>
                        <div className={styles.lidsIntro__register__list__header}>
                            <p>To'plam qo'shish</p>
                            <i onClick={() => setAddCollection(false)} className="fa-solid fa-x"></i>
                        </div>
                        <form className={styles.lidsIntro__register__list__form} onSubmit={handleCollectionSubmit}>
                            <label htmlFor="student">
                                <p>Talaba:</p>
                                <Select
                                    options={productOptions}
                                    placeholder
                                    value={selectedCollection}
                                    onChange={handleProductChange}
                                    required
                                />
                            </label>

                            <span>
                                <p>To'lov usuli:</p>
                                <label htmlFor="cash">
                                    <input
                                        id="cash"
                                        type="radio"
                                        name="CollectionMethod"
                                        value="Naqd pul"
                                        required
                                        checked={formCollectionData.CollectionMethod === 'Naqd pul'}
                                        onChange={handleCollectionChange}
                                    />
                                    <p>Naqd pul</p>
                                </label>
                                <label htmlFor="card">
                                    <input
                                        id="card"
                                        type="radio"
                                        name="CollectionMethod"
                                        value="Plastik kartasi"
                                        required
                                        checked={formCollectionData.CollectionMethod === 'Plastik kartasi'}
                                        onChange={handleCollectionChange}
                                    />
                                    <p>Plastik kartasi</p>
                                </label>
                                <label htmlFor="bank">
                                    <input
                                        id="bank"
                                        type="radio"
                                        name="CollectionMethod"
                                        value="Bank hisobi"
                                        required
                                        checked={formCollectionData.CollectionMethod === 'Bank hisobi'}
                                        onChange={handleCollectionChange}
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
                                    value={formCollectionData.amount}
                                    onChange={handleCollectionChange}
                                />
                            </label>

                            <label htmlFor="date">
                                <p>Sana:</p>
                                <input
                                    id="date"
                                    name="date"
                                    type="date"
                                    required
                                    value={formCollectionData.date}
                                    onChange={handleCollectionChange}
                                />
                            </label>

                            <label htmlFor="comment">
                                <p>Izoh:</p>
                                <textarea
                                    id="comment"
                                    name="comment"
                                    value={formCollectionData.comment}
                                    onChange={handleCollectionChange}
                                />
                            </label>

                            <button type="submit">Yuborish</button>
                        </form>
                    </div>
                </div>
            </LeftIntro>
        </section>
    )
}

export default LidsIntro;