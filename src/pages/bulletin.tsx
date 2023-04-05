import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { BulletinModal } from "src/components/bulletin/BulletinModal";
import { StrictDroppable } from "src/components/bulletin/StrictDroppable";
import { DotsVertical, Plus } from "tabler-icons-react";

interface Sticker {
    date: string;
    content: string;
}
interface Card {
    id: string;
    title: string;
    stickers: Sticker[];
    color: string;
    btnColor: string;
}

export default function Forum() {
    const cards: Card[] = [
        {
            title: "To Do",
            id: "card1",
            stickers: [
                {
                    date: "Wednesday, 22th March 2023",
                    content: "Meet Titus Low at Yishun for ketchup",
                },
                {
                    date: "Thursday, 23th March 2023",
                    content:
                        "Book a dentist appointment due to eating the wrong suace at ice cream place",
                },
                {
                    date: "Sunday, 19th March 2023",
                    content: "Set up a meeting with jenna for some croffle",
                },
            ],
            color: "bg-[#CDDFE0]",
            btnColor: "bg-[#B5CACB]",
        },
        {
            title: "In Progress",
            id: "card2",
            stickers: [
                {
                    date: "Friday, 17th March 2023",
                    content: "Zile's TCM Claim",
                },
                {
                    date: "Monday, 20th March 2023 ",
                    content: "Terry's FYP",
                },
            ],
            color: "bg-[#D9D8FF]",
            btnColor: "bg-[#C0BFE7]",
        },
        {
            title: "Completed",
            id: "card3",
            stickers: [
                {
                    date: "Wednesday, 8th March 2023",
                    content: "Babysit Moonbear",
                },
                {
                    date: "Wednesday, December 88 8888",
                    content: "Process Amie's Wife insurance",
                },
                {
                    date: "Monday, 13th March 2023",
                    content: "Jia Hui's birthday gift",
                },
            ],
            color: "bg-[#D0E7C6]",
            btnColor: "bg-[#AFCAA4]",
        },
    ];
    const [items, setItems] = useState<Card[]>(cards);
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState<Dayjs | null>(null);
    const [content, setContent] = useState("");
    const [cardId, setCardId] = useState("");

    function openModal() {
        setIsOpen(true);
    }
    const addTask = () => {
        if (date) {
            const weekday = date.format("dddd");
            const month = date.format("MMMM");
            const day = date.format("DD");
            const year = date.format("YYYY");
            const finalDate = `${weekday}, ${day}th ${month} ${year}`;
            const sticker = {
                date: finalDate,
                content: content,
            };
            const finalItems = items;
            const item = finalItems.find((val) => {
                return val.id === cardId;
            });
            if (item) {
                item.stickers.push(sticker);
            }
            setItems(finalItems);
            setDate(null);
        }
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
            return value.id === source.droppableId;
        });
        const destinationCard = finalItems.find((value) => {
            return value.id === destination.droppableId;
        });
        if (sourceCard) {
            dragItem = sourceCard.stickers[source.index];
            sourceCard.stickers.splice(source.index, 1);
        }
        if (destinationCard && dragItem) {
            destinationCard.stickers.splice(destination.index, 0, dragItem);
        }

        setItems(finalItems);
    };
    return (
        <div className="w-5/6 flex flex-col gap-10">
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
                                        className={`flex flex-col gap-4 ${item.color} p-4 rounded-lg`}
                                    >
                                        <span className="text-2xl text-black font-medium">
                                            {item.title}
                                        </span>
                                        {item.stickers.map(
                                            (item, stickerIdx) => (
                                                <Draggable
                                                    key={`drag${idx}stick${stickerIdx}`}
                                                    draggableId={`drag${idx}stick${stickerIdx}`}
                                                    index={stickerIdx}
                                                >
                                                    {(provided, snapshot) => (
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
                                                            <span className="flex justify-between">
                                                                {item.content}
                                                                <DotsVertical />
                                                            </span>
                                                            <div></div>
                                                            <div className="text-gray-400">
                                                                {item.date}
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            )
                                        )}
                                        {provided.placeholder}

                                        <button
                                            className={`flex text-black ${item.btnColor} w-2/6 2xl:w-1/6 rounded-lg items-center justify-center`}
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
        </div>
    );
}
