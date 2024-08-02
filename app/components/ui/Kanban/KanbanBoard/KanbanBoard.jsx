import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "../Column/Column";
import styles from './KanbanBoard.module.scss';
import LeftIntro from "../../Left/LeftIntro";
import Select from "react-select";

export default function KanbanBoard() {
    const [ready, setReady] = useState(false);
    const [addStudent, setAddStudent] = useState(false);
    const [addCollection, setAddCollection] = useState(false);
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
                            name: "Mukhammadjonov javlon",
                            phone: "+998905251243",
                            date: "02.08.2024",
                            time: "11:51",
                            avt: "https://randomuser.me/api/portraits/men/75.jpg"
                        },
                        {
                            id: 2,
                            name: "Mukhammadjonov javlon",
                            phone: "+998905251243",
                            date: "02.08.2024",
                            time: "11:51",
                            avt: "https://randomuser.me/api/portraits/men/67.jpg"
                        }
                    ]
                },
                {
                    id: 2,
                    category_name: "frontend",
                    items: [
                        {
                            id: 4,
                            name: "Mukhammadjonov javlon",
                            phone: "+998905251243",
                            date: "02.08.2024",
                            time: "11:51",
                            avt: "https://randomuser.me/api/portraits/men/67.jpg"
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
                            name: "Mukhammadjonov javlon",
                            phone: "+998905251243",
                            date: "02.08.2024",
                            time: "11:51",
                            avt: "https://randomuser.me/api/portraits/men/75.jpg"
                        },
                        {
                            id: 6,
                            name: "Mukhammadjonov javlon",
                            phone: "+998905251243",
                            date: "02.08.2024",
                            time: "11:51",
                            avt: "https://randomuser.me/api/portraits/men/67.jpg"
                        }
                    ]
                },
                {
                    id: 2,
                    category_name: "frontend",
                    items: [
                        {
                            id: 7,
                            name: "Mukhammadjonov javlon",
                            phone: "+998905251243",
                            date: "02.08.2024",
                            time: "11:51",
                            avt: "https://randomuser.me/api/portraits/men/75.jpg"
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
                            name: "Mukhammadjonov javlon",
                            phone: "+998905251243",
                            date: "02.08.2024",
                            time: "11:51",
                            avt: "https://randomuser.me/api/portraits/men/75.jpg"
                        },
                        {
                            id: 10,
                            name: "Mukhammadjonov javlon",
                            phone: "+998905251243",
                            date: "02.08.2024",
                            time: "11:51",
                            avt: "https://randomuser.me/api/portraits/men/67.jpg"
                        }
                    ]
                },
                {
                    id: 2,
                    category_name: "frontend",
                    items: [
                        {
                            id: 11,
                            name: "Mukhammadjonov javlon",
                            phone: "+998905251243",
                            date: "02.08.2024",
                            time: "11:51",
                            avt: "https://randomuser.me/api/portraits/men/75.jpg"
                        },
                    ]
                }
            ]
        }
    ]);

    const [CollectionData, setCollectionData] = useState([{ id: 1, name: 'Jony', }, { id: 2, name: 'Alex', }, { id: 3, name: 'Jasur', }, { id: 4, name: 'Saidjalol', }]);
    const productOptions = CollectionData.map((item) => ({
        value: item.id,
        label: item.name,
    }));

    // Initialize state for the first form
    const [form1, setForm1] = useState({
        firstName: '',
        lastName: '',
        phone1: '',
        phone2: '',
        course: '',
        location: '',
        comment: ''
    });

    // Initialize state for the second form
    const [form2, setForm2] = useState({
        amount: '',
        course: '',
        teacher: '',
        days: '',
        date: ''
    });

    // Format phone number
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

    // Handle changes for form1
    const handleForm1Change = (e) => {
        const { name, value } = e.target;

        if (name === 'phone1' || name === 'phone2') {
            const formattedPhone = formatPhoneNumber(value);
            setForm1(prevState => ({ ...prevState, [name]: formattedPhone }));
        } else {
            setForm1(prevState => ({ ...prevState, [name]: value }));
        }
    };

    // Handle changes for form2
    const handleForm2Change = (e) => {
        const { name, value } = e.target;

        setForm2(prevState => ({ ...prevState, [name]: value }));
    };

    // Handle select changes
    const handleSelectChange = (form, name, option) => {
        const value = option ? option.value : '';
        if (form === 'form1') {
            setForm1(prevState => ({ ...prevState, [name]: value }));
        } else if (form === 'form2') {
            setForm2(prevState => ({ ...prevState, [name]: value }));
        }
    };

    // Handle form submission for form1
    const handleForm1Submit = (e) => {
        e.preventDefault();
        // Prepare data for submission
        const data = { ...form1 };
        console.log('Form 1 Data:', data);
        // Send data to the backend
        // fetch('/your-api-endpoint', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } });
    };

    // Handle form submission for form2
    const handleForm2Submit = (e) => {
        e.preventDefault();
        // Prepare data for submission
        const data = { ...form2 };
        console.log('Form 2 Data:', data);
        // Send data to the backend
        // fetch('/your-api-endpoint', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } });
    };


    const [categoryVisibility, setCategoryVisibility] = useState(() => {
        return boardData.map(board => board.category.map(() => false));
    });

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

    function getItemsCountPerColumn(boardData) {
        return boardData.map((board) =>
            board.category.map((category) => category.items.length)
        );
    }

    function getTotalItemsCountPerColumn(boardData) {
        const itemsCountPerColumn = getItemsCountPerColumn(boardData);
        return itemsCountPerColumn.map((columnCounts) =>
            columnCounts.reduce((acc, count) => acc + count, 0)
        );
    }
    const totalItemsCountPerColumn = getTotalItemsCountPerColumn(boardData);

    const toggleCategoryVisibility = (bIndex, cIndex) => {
        setCategoryVisibility(prevVisibility => {
            const newVisibility = [...prevVisibility];
            newVisibility[bIndex][cIndex] = !newVisibility[bIndex][cIndex];
            return newVisibility;
        });
    };

    return (
        <LeftIntro>
            <div>
                <div
                    className={`${styles.opacity} ${addStudent || addCollection ? styles.opacityAct : ""}`}
                    onClick={() => {
                        setAddStudent(false)
                        setAddCollection(false)
                    }}
                ></div>
                {ready && (
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className={styles.list}>
                            {boardData.map((board, bIndex) => (
                                <div className={`${styles.column} ${bIndex.isDraggingOver ? styles.columnDragging : ""}`} key={board.id}>
                                    <span className={styles.gradientBar}></span>
                                    <h4 className={styles.columnTitle}>
                                        <span className={styles.columnTitleText}>
                                            <b>{board.name}</b>
                                            <p>({totalItemsCountPerColumn[bIndex]})</p>
                                        </span>
                                        {
                                            (board.name === "So'rovlar" || board.name === "To'plamlar") && (
                                                <p onClick={() => {
                                                    if (board.name === "So'rovlar") {
                                                        setAddStudent(true)
                                                    } else {
                                                        setAddCollection(true)
                                                    }

                                                }} className={styles.iconAdd}>
                                                    <i className="fa-solid fa-plus"></i>
                                                </p>
                                            )
                                        }
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
                                                        <p className={styles.icon} onClick={() => toggleCategoryVisibility(bIndex, cIndex)}>
                                                            <i className={`fa-solid ${categoryVisibility[bIndex][cIndex] ? "fa-angle-down" : "fa-angle-up"}`}></i>
                                                        </p>
                                                    </h4>

                                                    <div className={`${styles.tasksContainer} ${categoryVisibility[bIndex][cIndex] ? "" : styles.dn}`}>
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

                <div className={`${styles.lidsIntro__register} ${addStudent || addCollection ? styles.registerAct : ""}`}>
                    <div style={{ display: addStudent ? '' : 'none' }} className={styles.lidsIntro__register__list}>
                        <div className={styles.lidsIntro__register__list__header}>
                            <p>So'rovlar</p>
                            <i onClick={() => setAddStudent(false)} className="fa-solid fa-x"></i>
                        </div>
                        <form className={styles.lidsIntro__register__list__form} onSubmit={handleForm1Submit}>
                            <label>
                                <p>Ismi</p>
                                <input type="text" name="firstName" value={form1.firstName} onChange={handleForm1Change} />
                            </label>
                            <label>
                                <p>Familiyasi</p>
                                <input type="text" name="lastName" value={form1.lastName} onChange={handleForm1Change} />
                            </label>
                            <label>
                                <p>Telefoni:</p>
                                <input type="text" name="phone1" value={form1.phone1} onChange={handleForm1Change} />
                            </label>
                            <label>
                                <p>Telefoni:</p>
                                <input type="text" name="phone2" value={form1.phone2} onChange={handleForm1Change} />
                            </label>
                            <label>
                                <p>Qaysi kursga:</p>
                                <Select
                                    options={productOptions}
                                    placeholder="Select course"
                                    value={productOptions.find(option => option.value === form1.course)}
                                    onChange={(option) => handleSelectChange('form1', 'course', option)}
                                    required
                                />
                            </label>
                            <label>
                                <p>Qaerdan:</p>
                                <Select
                                    options={productOptions}
                                    placeholder="Select location"
                                    value={productOptions.find(option => option.value === form1.location)}
                                    onChange={(option) => handleSelectChange('form1', 'location', option)}
                                    required
                                />
                            </label>
                            <label htmlFor="comment">
                                <p>Izoh:</p>
                                <textarea
                                    id="comment"
                                    name="comment"
                                    value={form1.comment}
                                    onChange={handleForm1Change}
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
                        <form className={styles.lidsIntro__register__list__form} onSubmit={handleForm2Submit}>
                            <label htmlFor="amount">
                                <p>Nomi:</p>
                                <input
                                    id="amount"
                                    name="amount"
                                    type="text"
                                    value={form2.amount}
                                    onChange={handleForm2Change}
                                    required
                                />
                            </label>
                            <label htmlFor="course">
                                <p>Kurs tanlash:</p>
                                <Select
                                    name="course"
                                    options={productOptions}
                                    placeholder="Select course"
                                    onChange={(option) => handleSelectChange('form2', 'course', option)}
                                    value={productOptions.find(option => option.value === form2.course)}
                                    required
                                />
                            </label>
                            <label htmlFor="teacher">
                                <p>Ustozni tanlang:</p>
                                <Select
                                    name="teacher"
                                    options={productOptions}
                                    placeholder="Select teacher"
                                    onChange={(option) => handleSelectChange('form2', 'teacher', option)}
                                    value={productOptions.find(option => option.value === form2.teacher)}
                                    required
                                />
                            </label>
                            <label htmlFor="days">
                                <p>Kunlar:</p>
                                <Select
                                    name="days"
                                    options={productOptions}
                                    placeholder="Select days"
                                    onChange={(option) => handleSelectChange('form2', 'days', option)}
                                    value={productOptions.find(option => option.value === form2.days)}
                                    required
                                />
                            </label>
                            <label htmlFor="date">
                                <p>Sana:</p>
                                <input
                                    id="date"
                                    name="date"
                                    type="date"
                                    value={form2.date}
                                    onChange={handleForm2Change}
                                    required
                                />
                            </label>
                            <button type="submit">Yuborish</button>
                        </form>
                    </div>
                </div>
            </div>
        </LeftIntro>
    );
}
