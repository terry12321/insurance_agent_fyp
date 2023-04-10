import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { File as TablerFile, X } from "tabler-icons-react";
import { Upload, message } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { createClient } from "@supabase/supabase-js";
import { apiKey, supabase, UserFileUrlType } from "src/utils/supabase";
import { BEinstance } from "src/utils/axios";
import toast from "react-hot-toast";

export const DocumentModal = ({
    isOpen,
    setIsOpen,
    getFilesCallback,
}: DocumentModalProps) => {
    const { Dragger } = Upload;
    const [media, setMedia] = useState<UploadFile[]>([]);
    const [name, setName] = useState("");
    const props = {
        name: "file",
        beforeUpload: (file: UploadFile) => {
            setMedia([...media, file]);
            return false;
        },
    };
    function closeModal() {
        setIsOpen(false);
    }
    const mediaUploader = async (
        files: UploadFile[],
        getFilesCallback: () => Promise<void>
    ) => {
        const toastId = toast.loading("Adding file");
        const promiseBody: Promise<UserFileUrlType | undefined>[] = files.map(
            async (file) => {
                if (file.originFileObj) {
                    const body = await supabase.storage
                        .from("files")
                        .upload(`public/${file.name}`, file.originFileObj);
                    if (body.data && body.data !== undefined) {
                        const url = await supabase.storage
                            .from("files")
                            .getPublicUrl(body.data.path);
                        return { path: url.data.publicUrl, name: name };
                    } else {
                        return undefined;
                    }
                }
            }
        );
        try {
            const data = await Promise.all(promiseBody);
            const isDataUndefined = data.some((val) => val === undefined);
            if (!isDataUndefined) {
                await BEinstance.post("/users/upload-file", data);
                getFilesCallback();
                closeModal();
                toast.dismiss(toastId);
            }
        } catch (error) {
            console.error(error);
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
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="flex flex-col gap-3 w-1/2 py-10 transform overflow-y-scroll rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="flex justify-between items-center"
                                    >
                                        <span className="text-3xl font-medium leading-6 text-gray-900">
                                            Upload file
                                        </span>
                                        <button
                                            onClick={() => {
                                                setIsOpen(false);
                                            }}
                                        >
                                            <X className="text-black" />
                                        </button>
                                    </Dialog.Title>
                                    <div className="flex flex-col mt-4 text-black text-lg">
                                        <label>Name</label>
                                        <input
                                            onChange={(e) => {
                                                setName(e.target.value);
                                            }}
                                            className="border border-[#BEBEBF] rounded-md bg-white outline-none px-2"
                                        />
                                    </div>

                                    {/* <div className="flex flex-col mt-4 text-black text-lg">
                                        <label>Document</label>
                                        <div className="flex flex-col border-2 border-dashed rounded-md justify-center items-center py-4">
                                            <File className="w-20 h-20 font-thin" />
                                            <span>
                                                Drop your files here, or Browse
                                            </span>
                                        </div>
                                    </div> */}

                                    <Dragger
                                        {...props}
                                        onChange={({ file, fileList }) => {
                                            const { status } = file;
                                            if (status !== "uploading") {
                                                setMedia(fileList);
                                            }
                                            if (status === "done") {
                                                message.success(
                                                    `${file.name} file uploaded successfully.`
                                                );
                                            } else if (status === "error") {
                                                message.error(
                                                    `${file.name} file upload failed.`
                                                );
                                            }
                                        }}
                                    >
                                        <div className="flex flex-col justify-center items-center">
                                            <TablerFile className="w-20 h-20 font-thin" />
                                            <span>
                                                Drop your files here, or Browse
                                            </span>
                                        </div>
                                    </Dragger>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={() =>
                                                mediaUploader(
                                                    media,
                                                    getFilesCallback
                                                )
                                            }
                                        >
                                            Upload
                                        </button>
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

export interface DocumentModalProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    getFilesCallback: () => Promise<void>;
}
