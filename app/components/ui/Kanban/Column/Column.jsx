import Image from 'next/image';
import React, { useState } from 'react';
import { Draggable } from "react-beautiful-dnd";
import styles from './Column.module.scss';

function Column({ data, index }) {
    const [addStudent, setAddStudent] = useState(false);
    const [addCollection, setAddCollection] = useState(false);

    return (
        <>
            <div
                className={`${styles.opacity} ${addStudent || addCollection ? styles.opacityAct : ""}`}
                onClick={() => {
                    setAddStudent(false)
                    setAddCollection(false)
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
                            <span className={styles.card__element__dot}>
                                <p onClick={() => setAddStudent(true)}>
                                    <i className="fa-regular fa-clock"></i>
                                </p>
                                <p onClick={() => setAddCollection(true)}>
                                    <i className="fa-solid fa-ellipsis-vertical"></i>
                                </p>
                            </span>
                            <span className={styles.card__element__time}>
                                <p>{data.date}</p>
                                <p>{data.time}</p>
                            </span>
                        </div>
                    </div>
                )}
            </Draggable>

            <div className={`${styles.lidsIntro__register} ${addStudent || addCollection ? styles.registerAct : ""}`}>
                <div style={{ display: addStudent ? '' : 'none' }} className={styles.lidsIntro__register__list}>
                    <div className={styles.lidsIntro__register__list__header}>
                        <p>So'rovlar</p>
                        <i onClick={() => setAddStudent(false)} className="fa-solid fa-x"></i>
                    </div>

                    <form className={styles.lidsIntro__register__list__form}>
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
                </div>
            </div>
        </>
    );
}

export default Column;
