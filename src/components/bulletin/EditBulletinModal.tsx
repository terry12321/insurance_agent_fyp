import { Dialog, Transition } from "@headlessui/react";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { Note } from "src/pages/bulletin";
import { X } from "tabler-icons-react";

export const EditBulletinModal = ({
    isOpen,
    note,
    setIsOpen,
    handleUpdate,
}: BulletinModalProps) => {
    const dateFormat = "DD/MM/YYYY";
    const [noteDate, setNoteDate] = useState<Dayjs | null>(null);
    const [content, setContent] = useState("");

    async function closeModal() {
        // await addTask();
        if (note) {
            note.content = content;
            note.date = dayjs(noteDate).format(dateFormat).toString();
            handleUpdate(note);
        }
        setIsOpen(false);
    }

    useEffect(() => {
        if (note) {
            setContent(note.content);
            const noteDate = dayjs(note.date, dateFormat);
            setNoteDate(noteDate);
        }
    }, [note]);

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-2/4 h-3/6 2xl:w-1/4 2xl:h-2/6 overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-black text-2xl mb-4">
                                            Edit Task
                                        </span>
                                        <X
                                            className="h-6 cursor-pointer text-black"
                                            onClick={() => setIsOpen(false)}
                                        />
                                    </div>
                                    <div className="h-5/6">
                                        <div className="flex flex-col w-full h-full gap-4">
                                            <div className="h-1/2">
                                                <label className="text-xl text-black">
                                                    Content
                                                </label>
                                                <textarea
                                                    maxLength={300}
                                                    value={content}
                                                    onChange={(e) => {
                                                        setContent(
                                                            e.target.value
                                                        );
                                                    }}
                                                    className="h-full bg-white outline-none border w-full p-2 mt-2 rounded-lg text-black"
                                                />
                                            </div>
                                            <div className="flex flex-col mt-10">
                                                <label className="text-xl text-black">
                                                    Date
                                                </label>
                                                <DatePicker
                                                    value={noteDate}
                                                    onChange={(e) => {
                                                        setNoteDate(e);
                                                    }}
                                                    className="w-1/4"
                                                />
                                            </div>
                                            <div className="flex justify-end">
                                                <button
                                                    type="submit"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-black px-8 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={closeModal}
                                                >
                                                    Update
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

interface BulletinModalProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    note: Note | undefined;
    handleUpdate: (note: Note) => void;
}
