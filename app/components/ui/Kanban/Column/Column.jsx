import Image from 'next/image';
import React from 'react';
import { Draggable } from "react-beautiful-dnd";
import styles from './Column.module.scss';

function Column({ data, index }) {
    return (
        <Draggable index={index} draggableId={data.id.toString()}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={styles.card}
                >
                    <h5 className={styles.title}>{data.title}</h5>
                    <div className={styles.flexContainer}>
                        <div className={styles.flexItems}>
                            <span className={styles.spaceItems}>
                                <span>{data.chat}</span>
                            </span>
                            <span className={styles.spaceItems}>
                                <span>{data.attachment}</span>
                            </span>
                        </div>

                        <ul className={styles.assigneesList}>
                            {data.assignees.map((ass, index) => {
                                return (
                                    <li key={index}>
                                        <Image
                                            src={ass.avt}
                                            width="36"
                                            height="36"
                                            className={styles.assigneeImage}
                                        />
                                    </li>
                                );
                            })}
                            <li>
                                <button className={styles.addButton}>
                                    {/* Добавьте содержимое кнопки, если нужно */}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </Draggable>
    );
}

export default Column;
