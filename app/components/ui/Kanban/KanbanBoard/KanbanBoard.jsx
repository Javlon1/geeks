import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "../Column/Column";
import styles from './KanbanBoard.module.scss';
import LeftIntro from "../../Left/LeftIntro";

export default function KanbanBoard() {
    const [ready, setReady] = useState(false);
    const [boardData, setBoardData] = useState([
        {
            id: 1,
            name: "So'rovlar",
            category: [
                {
                    id: 1,
                    category_name: "backend",
                    items: [
                        {
                            id: 1,
                            title: "Company website redesign.",
                            chat: 1,
                            attachment: 2,
                            assignees: [
                                {
                                    avt: "https://randomuser.me/api/portraits/men/75.jpg"
                                }
                            ]
                        },
                        {
                            id: 2,
                            title: "Mobile app login process prototype.",
                            chat: 10,
                            attachment: 4,
                            assignees: [
                                {
                                    avt: "https://randomuser.me/api/portraits/men/67.jpg"
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    category_name: "frontend",
                    items: [
                        {
                            id: 4,
                            title: "Mobile app login process prototype.",
                            chat: 10,
                            attachment: 4,
                            assignees: [
                                {
                                    avt: "https://randomuser.me/api/portraits/men/67.jpg"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            name: "To'plamlar",
            category: [
                {
                    id: 1,
                    category_name: "backend",
                    items: [
                        {
                            id: 5,
                            title: "Company website redesign.",
                            chat: 1,
                            attachment: 2,
                            assignees: [
                                {
                                    avt: "https://randomuser.me/api/portraits/men/75.jpg"
                                }
                            ]
                        },
                        {
                            id: 6,
                            title: "Mobile app login process prototype.",
                            chat: 10,
                            attachment: 4,
                            assignees: [
                                {
                                    avt: "https://randomuser.me/api/portraits/men/67.jpg"
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    category_name: "frontend",
                    items: [
                        {
                            id: 7,
                            title: "Company website redesign.",
                            chat: 1,
                            attachment: 2,
                            assignees: [
                                {
                                    avt: "https://randomuser.me/api/portraits/men/75.jpg"
                                }
                            ]
                        },
                    ]
                }
            ]
        },
        {
            id: 3,
            name: "Rad qilganlar",
            category: [
                {
                    id: 1,
                    category_name: "backend",
                    items: [
                        {
                            id: 9,
                            title: "Company website redesign.",
                            chat: 1,
                            attachment: 2,
                            assignees: [
                                {
                                    avt: "https://randomuser.me/api/portraits/men/75.jpg"
                                }
                            ]
                        },
                        {
                            id: 10,
                            title: "Mobile app login process prototype.",
                            chat: 10,
                            attachment: 4,
                            assignees: [
                                {
                                    avt: "https://randomuser.me/api/portraits/men/67.jpg"
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    category_name: "frontend",
                    items: [
                        {
                            id: 11,
                            title: "Company website redesign.",
                            chat: 1,
                            attachment: 2,
                            assignees: [
                                {
                                    avt: "https://randomuser.me/api/portraits/men/75.jpg"
                                }
                            ]
                        },
                    ]
                }
            ]
        }
    ]);


    useEffect(() => {
        if (process.browser) {
            setReady(true);
        }
    }, []);

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        const [sourceBoardIndex, sourceCategoryIndex] = source.droppableId.split('-').map(Number);
        const [destinationBoardIndex, destinationCategoryIndex] = destination.droppableId.split('-').map(Number);

        setBoardData(prevBoardData => {
            const newBoardData = [...prevBoardData];
            const dragItem = newBoardData[sourceBoardIndex].category[sourceCategoryIndex].items[source.index];

            newBoardData[sourceBoardIndex].category[sourceCategoryIndex].items.splice(source.index, 1);

            newBoardData[destinationBoardIndex].category[destinationCategoryIndex].items.splice(destination.index, 0, dragItem);

            return newBoardData;
        });
    };


    return (
        <LeftIntro>
            <div>
                {ready && (
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className={styles.list}>
                            {boardData.map((board, bIndex) => (
                                <div className={`${styles.column} ${bIndex.isDraggingOver ? styles.columnDragging : ""}`} key={board.id}>
                                    <span className={styles.gradientBar}></span>
                                    <h4 className={styles.columnTitle}>
                                        <span className={styles.columnTitleText}>
                                            <b>{board.name}</b>
                                        </span>
                                    </h4>
                                    {board.category.map((category, cIndex) => (
                                        <Droppable
                                            droppableId={`${bIndex}-${cIndex}`}
                                            key={`${bIndex}-${cIndex}`}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    className={`${styles.column_droppable} ${snapshot.isDraggingOver ? styles.columnDragging : ""}`}
                                                >
                                                    <span className={styles.gradientBar}></span>
                                                    <h4 className={styles.columnTitle}>
                                                        <span className={styles.column_droppable_TitleText}>
                                                            <b>{category.category_name}</b>
                                                            <p>({category.items.length})</p>
                                                        </span>
                                                    </h4>

                                                    <div className={styles.tasksContainer}>
                                                        {category.items.length > 0 &&
                                                            category.items.map((item, iIndex) => (
                                                                <Column
                                                                    key={item.id}
                                                                    data={item}
                                                                    index={iIndex}
                                                                />
                                                            ))}
                                                        {provided.placeholder}
                                                    </div>
                                                </div>
                                            )}
                                        </Droppable>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </DragDropContext>
                )}
            </div>
        </LeftIntro>
    );
}