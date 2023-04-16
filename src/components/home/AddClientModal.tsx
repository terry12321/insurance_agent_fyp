import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { Trash, Upload as UploadIcon, X } from "tabler-icons-react";
import { Select, UploadFile, UploadProps } from "antd";
import { Occupation } from "./interface/ClientInterface";
import { Upload, Button } from "antd";
import { supabase } from "src/utils/supabase";
import { RcFile } from "antd/es/upload";
import { Spin } from "antd";
const Option = Select.Option;

export const AddClientModal = ({
    isOpen,
    setIsOpen,
    occupation,
    setSelectedOccupation,
}: AddClientModalProps) => {
    const [file, setFile] = useState<ImageUpload | null>(null);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [showSpin, setShowSpin] = useState(false);

    async function closeModal() {
        setIsOpen(false);
    }
    // const handleChange = (value: any) => {
    //     setSelectedOccupation(value);
    // };

    const handleCustomUpload = async (RcCustomRequestOptions: any) => {
        setShowSpin(true);
        if (RcCustomRequestOptions.file) {
            const file = RcCustomRequestOptions.file;
            const body = await supabase.storage
                .from("files")
                .upload(`userpicture/${file.name}`, file);
            if (body.data && body.data !== undefined) {
                const url = await supabase.storage
                    .from("files")
                    .getPublicUrl(body.data.path);
                setFile({ url: url.data.publicUrl, fileName: file.name });
                setShowSpin(false);
            }
        }
    };
    const handleChange: UploadProps["onChange"] = async ({
        file,
        fileList,
    }) => {
        setFileList(fileList);
    };

    const handleDelete = async (url: string) => {
        setShowSpin(true);
        const urlSplit = url.split("/");
        const path = `${urlSplit[urlSplit.length - 2]}/${
            urlSplit[urlSplit.length - 1]
        }`;
        const { data, error } = await supabase.storage
            .from("files")
            .remove([`${path}`]);
        if (data) {
            setFile(null);
            setShowSpin(false);
        }
    };

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
                                <Dialog.Panel className="w-2/4 2xl:w-1/4 2xl:h-2/6 overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-black text-2xl mb-4">
                                            Add Tasks
                                        </span>
                                        <X
                                            className="h-6 cursor-pointer text-black"
                                            onClick={() => setIsOpen(false)}
                                        />
                                    </div>
                                    <div className="flex flex-col w-full h-full gap-4 text-black">
                                        <div className="flex flex-col">
                                            <label className="text-xl">
                                                Profile Picture
                                            </label>
                                            <Upload
                                                disabled={file !== null}
                                                customRequest={
                                                    handleCustomUpload
                                                }
                                                {...{
                                                    name: "profileImage",
                                                }}
                                                fileList={fileList}
                                                maxCount={1}
                                                onChange={handleChange}
                                                showUploadList={false}
                                            >
                                                <Button disabled={file !== null} className="flex gap-2 top-0 left-0">
                                                    <UploadIcon size={20} />{" "}
                                                    Click to Upload
                                                </Button>
                                            </Upload>
                                        </div>
                                        <div>
                                            {showSpin && <Spin />}
                                            {!showSpin && file && (
                                                <div className="flex w-full border items-center p-2 rounded-lg justify-between">
                                                    <div className="flex gap-2 items-center">
                                                        <img
                                                            width={50}
                                                            height={50}
                                                            className="rounded-full"
                                                            src={file.url}
                                                        />
                                                        <a
                                                            target={"_blank"}
                                                            rel="noreferrer"
                                                            href={file.url}
                                                            className="hover:text-blue-400"
                                                        >
                                                            {file.fileName}
                                                        </a>
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                file.url
                                                            )
                                                        }
                                                    >
                                                        <Trash size={20} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col">
                                            <label className="text-xl">
                                                Name
                                            </label>
                                            <input className="bg-white rounded-md border border-[#BEBEBF] outline-none p-2" />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-xl">
                                                NRIC
                                            </label>
                                            <input className="bg-white rounded-md border border-[#BEBEBF] outline-none p-2" />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-xl">
                                                Contact Number
                                            </label>
                                            <input className="bg-white rounded-md border border-[#BEBEBF] outline-none p-2" />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-xl">
                                                Email
                                            </label>
                                            <input className="bg-white rounded-md border border-[#BEBEBF] outline-none p-2" />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-xl">
                                                Address
                                            </label>
                                            <input className="bg-white rounded-md border border-[#BEBEBF] outline-none p-2" />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-xl">
                                                Occupation
                                            </label>
                                            <Select
                                                showSearch
                                                style={{ width: 200 }}
                                                placeholder="Select a person"
                                                optionFilterProp="children"
                                                onChange={(value) => {
                                                    handleChange(value);
                                                }}
                                                filterOption={(
                                                    input,
                                                    option
                                                ) => {
                                                    if (option) {
                                                        return (
                                                            option.props.children
                                                                .toLowerCase()
                                                                .indexOf(
                                                                    input.toLowerCase()
                                                                ) >= 0
                                                        );
                                                    } else {
                                                        return false;
                                                    }
                                                }}
                                            >
                                                {occupation.length > 0 &&
                                                    occupation.map(
                                                        (eachOccupation) => {
                                                            return (
                                                                <>
                                                                    <Option
                                                                        key={
                                                                            eachOccupation.id
                                                                        }
                                                                        value={
                                                                            eachOccupation.occupation
                                                                        }
                                                                    >
                                                                        {
                                                                            eachOccupation.occupation
                                                                        }
                                                                    </Option>
                                                                </>
                                                            );
                                                        }
                                                    )}
                                            </Select>
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
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

interface AddClientModalProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    occupation: Array<Occupation>;
    setSelectedOccupation: React.Dispatch<React.SetStateAction<string>>;
}

interface ImageUpload {
    url: string;
    fileName: string;
}
