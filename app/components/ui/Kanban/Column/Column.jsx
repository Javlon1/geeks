import Image from 'next/image';
import React, { useState } from 'react';
import { Draggable } from "react-beautiful-dnd";
import styles from './Column.module.scss';
import Select from "react-select";

function Column({ data, index }) {
    const [editStudent, setEditStudent] = useState(false);
    const [openPopUp, setOpenPopUp] = useState(false);
    const [addComment, setAddComment] = useState(false);

    const [CollectionData, setCollectionData] = useState([{ id: 1, name: 'Jony', }, { id: 2, name: 'Alex', }, { id: 3, name: 'Jasur', }, { id: 4, name: 'Saidjalol', }]);
    const productOptions = CollectionData.map((item) => ({
        value: item.id,
        label: item.name,
    }));

    const [form, setForm] = useState({
        phone: '',
        ism: '',
        familya: '',
        status: '',
        date: '',
        comment: ''
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
            const formattedPhone = formatPhoneNumber(value);
            setForm((prevState) => ({ ...prevState, [name]: formattedPhone }));
        } else {
            setForm((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    const handleSelectChange = (name, option) => {
        const value = option ? option.value : '';
        setForm((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Данные формы:', form);
    };

    return (
        <>
            <div
                className={`${styles.opacity} ${editStudent || addComment ? styles.opacityAct : ""}`}
                onClick={() => {
                    setEditStudent(false)
                    setAddComment(false)
                    setOpenPopUp(false)
                }}
            ></div>

            <Draggable index={index} draggableId={data.id.toString()}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={styles.card}
                    >
                        <div className={styles.card__item}>
                            <Image
                                src={data.avt}
                                alt='avtar'
                                width="36"
                                height="36"
                                className={styles.card__item__avt}
                            />
                            <span className={styles.card__item__info}>
                                <h5 className={styles.card__item__info__name}>{data.name}</h5>
                                <a className={styles.card__item__info__phone} href={`tel:${data.phone}`}>{data.phone}</a>
                            </span>
                        </div>
                        <div className={styles.card__element}>
                            <div className={styles.card__element__dot}>
                                <p onClick={() => {
                                    setAddComment(true)
                                    setOpenPopUp(false)
                                    setEditStudent(false)
                                }}>
                                    <i className="fa-regular fa-clock"></i>
                                </p>
                                <p onClick={() => {
                                    setOpenPopUp(!openPopUp)
                                    setAddComment(false)
                                    setEditStudent(false)
                                }}>
                                    <i className="fa-solid fa-ellipsis-vertical"></i>
                                </p>
                                <div className={`${styles.card__element__dot__popUp} ${openPopUp ? styles.popUpAct : ""}`}>
                                    <span onClick={() => {
                                        console.log(data.id);
                                        setEditStudent(true)
                                        setOpenPopUp(false)
                                        setAddComment(false)
                                    }}>
                                        <i class="fa-solid fa-pen"></i>
                                        <b>Taxrirlash</b>
                                    </span>
                                    <span onClick={() => {
                                        console.log(data.id);
                                        setEditStudent(false)
                                        setOpenPopUp(false)
                                        setAddComment(false)
                                    }}>
                                        <i class="fa-solid fa-trash"></i>
                                        <b>O`chirish</b>
                                    </span>
                                </div>
                            </div>
                            <span className={styles.card__element__time}>
                                <p>{data.date}</p>
                                <p>{data.time}</p>
                            </span>
                        </div>
                    </div>
                )}
            </Draggable>

            <div className={`${styles.lidsIntro__register} ${editStudent || addComment ? styles.registerAct : ""}`}>
                <div style={{ display: editStudent ? '' : 'none' }} className={styles.lidsIntro__register__list}>
                    <div className={styles.lidsIntro__register__list__header}>
                        <p>Talabani tahrirlash</p>
                        <i onClick={() => setAddComment(false)} className="fa-solid fa-x"></i>
                    </div>
                    <form className={styles.lidsIntro__register__list__form} onSubmit={handleSubmit}>
                        <label>
                            <p>Telefon:</p>
                            <input
                                type="text"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            <p>Ism:</p>
                            <input
                                type="text"
                                name="ism"
                                value={form.ism}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            <p>Familya:</p>
                            <input
                                type="text"
                                name="familya"
                                value={form.familya}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            <p>Status:</p>
                            <Select
                                name="status"
                                options={productOptions}
                                placeholder
                                value={productOptions.find(option => option.value === form.status)}
                                onChange={(option) => handleSelectChange('status', option)}
                                required
                            />
                        </label>
                        <label>
                            <p>Tug'ilgan sana:</p>
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label htmlFor="comment">
                            <p>Izoh:</p>
                            <textarea
                                id="comment"
                                name="comment"
                                value={form.comment}
                                onChange={handleChange}
                            />
                        </label>
                        <button type="submit">Tahrirlash</button>
                    </form>
                </div>

                <div style={{ display: addComment ? '' : 'none' }} className={styles.lidsIntro__register__list}>
                    <div className={styles.lidsIntro__register__list__header}>
                        <p>{data.name}</p>
                        <i onClick={() => setEditStudent(false)} className="fa-solid fa-x"></i>
                    </div>

                    <form className={styles.lidsIntro__register__list__form}>
                        <label htmlFor="comment">
                            <p>Izoh:</p>
                            <textarea
                                id="comment"
                                name="comment"
                            />
                        </label>
                        <button type="submit">Qo'shish</button>
                    </form>

                    <div className={styles.lidsIntro__register__list__message}>
                        <p> <span>2024-07-12</span>  aytildi</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Column;
