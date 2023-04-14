import { Dropdown } from "antd";
import { Dayjs } from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { BulletinModal } from "src/components/bulletin/BulletinModal";
import { DocumentPage } from "src/components/bulletin/Document";
import { StrictDroppable } from "src/components/bulletin/StrictDroppable";
import { DeleteModal } from "src/components/common/DeleteModal";
import { BEinstance } from "src/utils/axios";
import { DotsVertical, Note, Plus } from "tabler-icons-react";

interface Note {
    id?: number;
    date: string;
    content: string;
    cardId: string;
}
interface Card {
    id: string;
    cardId: string;
    title: string;
    notes: Note[];
    color: string;
    btnColor: string;
}

export default function Forum() {
    const [items, setItems] = useState<Card[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [isOpenDelModal, setIsOpenDelModal] = useState(false);
    const [delId, setDelId] = useState<number | undefined>(undefined);
    const [date, setDate] = useState<Dayjs | null>(null);
    const [content, setContent] = useState("");
    const [cardId, setCardId] = useState("");
    const router = useRouter();

    const cards = [
        {
            id: 1,
            cardId: "card1",
            title: "To Do",
            color: "bg-[#CDDFE0]",
            btnColor: "bg-[#B5CACB]",
        },
        {
            id: 2,
            cardId: "card2",
            title: "In Progress",
            color: "bg-[#D9D8FF]",
            btnColor: "bg-[#C0BFE7]",
        },
        {
            id: 3,
            cardId: "card3",
            title: "Completed",
            color: "bg-[#D0E7C6]",
            btnColor: "bg-[#AFCAA4]",
        },
    ];

    function openModal() {
        setIsOpen(true);
    }
    const getCardColor = (id: number) => {
        let color = "";
        switch (id) {
            case 1:
                color = "bg-[#CDDFE0]";
                break;
            case 2:
                color = "bg-[#D9D8FF]";
                break;
            case 3:
                color = "bg-[#D0E7C6]";
                break;
        }
        return color;
    };
    const getCardBtncolor = (id: number) => {
        switch (id) {
            case 1:
                return "bg-[#B5CACB]";
            case 2:
                return "bg-[#C0BFE7]";
            case 3:
                return "bg-[#AFCAA4]";
        }
    };
    const getAllItems = async () => {
        await BEinstance.get("/task/get-all-task").then((value) => {
            setItems(value.data);
        });
    };
    const addTask = async () => {
        if (date) {
            const weekday = date.format("dddd");
            const month = date.format("MMMM");
            const day = date.format("DD");
            const year = date.format("YYYY");
            const finalDate = `${weekday}, ${day}th ${month} ${year}`;
            const noteCardId = items.find((value) => {
                return value.id.toString() === cardId;
            });
            if (noteCardId) {
                const note: Note = {
                    date: finalDate,
                    content: content,
                    cardId: noteCardId.cardId,
                };
                await BEinstance.post("/task", note).then(async (value) => {
                    if (value) {
                        await getAllItems();
                        setDate(null);
                    }
                });
            }
        }
    };
    const deleteNote = async (id: number) => {
        await BEinstance.post(`/task/${id}`).then(async (value) => {
            if (value) {
                await getAllItems();
            }
        });
    };
    const dragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }

        const finalItems = items;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        let dragItem;
        const sourceCard = finalItems.find((value) => {
            return value.id.toString() === source.droppableId;
        });
        const destinationCard = finalItems.find((value) => {
            return value.id.toString() === destination.droppableId;
        });
        if (sourceCard) {
            dragItem = sourceCard.notes[source.index];
            sourceCard.notes.splice(source.index, 1);
        }
        if (destinationCard && dragItem) {
            destinationCard.notes.splice(destination.index, 0, dragItem);
        }
        setItems(finalItems);
    };

    useEffect(() => {
        getAllItems();
    }, []);

    useEffect(() => {
        if (!isOpenDelModal && delId && isDelete) {
            deleteNote(delId);
        }
    }, [isOpenDelModal]);
    return (
        <div className="w-5/6 flex flex-col gap-10">
            <div className="flex gap-16 justify-end w-full text-black pl-4 py-4">
                <a
                    className={`${
                        router.asPath === "/bulletin"
                            ? "border-b-2 border-black"
                            : ""
                    }`}
                    href="/bulletin"
                >
                    Task
                </a>
                <a
                    className={`${
                        router.asPath === "/bulletin/document"
                            ? "border-b-2 border-black"
                            : ""
                    }`}
                    href="/bulletin/document"
                >
                    Documents
                </a>
            </div>
            {router.asPath === "/bulletin" ? (
                <>
                    <span className="text-black text-3xl font-medium">
                        Tasks on hand
                    </span>
                    <div className="flex w-full gap-8">
                        <DragDropContext onDragEnd={dragEnd}>
                            {items.map((item, idx) => (
                                <div key={idx} className="w-full">
                                    <StrictDroppable droppableId={`${item.id}`}>
                                        {(provided) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                className={`flex flex-col gap-4 ${getCardColor(
                                                    +item.id
                                                )} p-4 rounded-lg`}
                                            >
                                                <span className="text-2xl text-black font-medium">
                                                    {item.title}
                                                </span>
                                                {item.notes.map(
                                                    (item, noteIdx) => (
                                                        <Draggable
                                                            key={`drag${idx}note${noteIdx}`}
                                                            draggableId={`drag${idx}note${noteIdx}`}
                                                            index={noteIdx}
                                                        >
                                                            {(
                                                                provided,
                                                                snapshot
                                                            ) => (
                                                                <div
                                                                    ref={
                                                                        provided.innerRef
                                                                    }
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className={`flex flex-col gap-10 bg-white text-black p-4 rounded-lg w-full ${
                                                                        snapshot.isDragging
                                                                            ? "drop-shadow-2xl"
                                                                            : ""
                                                                    }`}
                                                                >
                                                                    <div className="flex justify-between">
                                                                        <span className="w-11/12">
                                                                            {
                                                                                item.content
                                                                            }
                                                                        </span>
                                                                        <span className="w-1/12 pt-1">
                                                                            <Dropdown
                                                                                arrow={
                                                                                    false
                                                                                }
                                                                                placement="bottom"
                                                                                menu={{
                                                                                    items: [
                                                                                        {
                                                                                            label: "delete",
                                                                                            key: 0,
                                                                                            onClick:
                                                                                                () => {
                                                                                                    setDelId(
                                                                                                        item.id
                                                                                                    );
                                                                                                    setIsOpenDelModal(
                                                                                                        true
                                                                                                    );
                                                                                                },
                                                                                        },
                                                                                    ],
                                                                                }}
                                                                                trigger={[
                                                                                    "click",
                                                                                ]}
                                                                            >
                                                                                <a
                                                                                    onClick={(
                                                                                        e
                                                                                    ) =>
                                                                                        e.preventDefault()
                                                                                    }
                                                                                >
                                                                                    <DotsVertical
                                                                                        size={
                                                                                            20
                                                                                        }
                                                                                    />
                                                                                </a>
                                                                            </Dropdown>
                                                                        </span>
                                                                    </div>
                                                                    <div></div>
                                                                    <div className="text-gray-400">
                                                                        {
                                                                            item.date
                                                                        }
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    )
                                                )}
                                                {provided.placeholder}

                                                <button
                                                    className={`flex text-black ${getCardBtncolor(
                                                        +item.id
                                                    )} w-2/6 2xl:w-1/6 rounded-lg items-center justify-center`}
                                                    onClick={() => {
                                                        openModal();
                                                        setCardId(`${item.id}`);
                                                    }}
                                                >
                                                    <Plus size={20} />
                                                    Add
                                                </button>
                                            </div>
                                        )}
                                    </StrictDroppable>
                                </div>
                            ))}
                        </DragDropContext>
                    </div>
                    <BulletinModal
                        setDate={setDate}
                        date={date}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        setContent={setContent}
                        addTask={addTask}
                    />
                    <DeleteModal
                        title="Delete task"
                        description="Are you sure you want to delete?"
                        isOpen={isOpenDelModal}
                        setIsOpen={setIsOpenDelModal}
                        setIsDelete={setIsDelete}
                    />
                </>
            ) : (
                <DocumentPage />
            )}
        </div>
    );
}
