import { Dialog, Transition } from "@headlessui/react";
import { DatePicker } from "antd";
import { Dayjs } from "dayjs";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { X } from "tabler-icons-react";

export const BulletinModal = ({
    date,
    setDate,
    isOpen,
    setIsOpen,
    setContent,
    addTask,
}: BulletinModalProps) => {
    function closeModal() {
        addTask();
        setIsOpen(false);
    }
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
                                            Add Tasks
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
                                                    onChange={(data) =>
                                                        setContent(
                                                            data.target.value
                                                        )
                                                    }
                                                    className="h-full bg-white outline-none border w-full p-2 mt-2 rounded-lg text-black"
                                                />
                                            </div>
                                            <div className="flex flex-col mt-10">
                                                <label className="text-xl text-black">
                                                    Date
                                                </label>
                                                <DatePicker
                                                    onChange={setDate}
                                                    value={date}
                                                    className="w-1/4"
                                                />
                                            </div>
                                            <div className="flex justify-end">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-black px-8 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={closeModal}
                                                >
                                                    Add Task
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
    date: Dayjs | null;
    setDate: Dispatch<SetStateAction<Dayjs | null>>;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    setContent: Dispatch<SetStateAction<string>>;
    addTask: () => void;
}
