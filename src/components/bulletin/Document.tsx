import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useCallback, useEffect, useState } from "react";
import { DocumentModal } from "./DocumentModal";
import { supabase, UserFileUrlType } from "src/utils/supabase";
import { BEinstance } from "src/utils/axios";
import Image from "next/image";
import { DotsVertical, Trash } from "tabler-icons-react";
import fileDownload from "js-file-download";
import { Dropdown } from "antd";
import { toast } from "react-hot-toast";
import { DeleteModal } from "../common/DeleteModal";

const getExtension = (url: string) => {
    const extension = url.substring(url.lastIndexOf("."));
    if (extension === ".jpeg" || extension === ".jpg") {
        return `/images/jpg-file.png`;
    } else {
        return `/images/${extension.replace(".", "")}-file.png`;
    }
};

const downloadFn = async (url: string) => {
    const extension = url.split("/");
    const path = `/${extension[extension.length - 2]}/${
        extension[extension.length - 1]
    }`;
    const { data, error } = await supabase.storage.from("files").download(path);
    if (data) {
        fileDownload(data, extension[extension.length - 1]);
        toast.success("File will be downloaded shortly");
    }
};

export const DocumentPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [files, setFiles] = useState<UserFileUrlType[]>([]);
    const [hoverIcon, setHoverIcon] = useState(-1);
    const [isDelete, setIsDelete] = useState(false);
    const [isOpenDelModal, setIsOpenDelModal] = useState(false);
    const [delFile, setDelFile] = useState<UserFileUrlType | undefined>(
        undefined
    );
    const getFilesCallback = useCallback(async () => {
        const data = await BEinstance.get("/users/get-files").then(
            async (files) => {
                return files.data.map((file: UserFileUrlType) => {
                    const returnFile: UserFileUrlType = {
                        id: file.id,
                        path: file.path,
                        name: file.name,
                    };
                    return returnFile;
                });
            }
        );
        setFiles(data);
    }, []);

    const deleteFile = async (file: UserFileUrlType) => {
        const toastId = toast.loading("Deleting file");
        await BEinstance.post(`/users/delete-file/${file.id}`).then(
            async () => {
                const urlSplit = file.path.split("/");
                const path = `${urlSplit[urlSplit.length - 2]}/${
                    urlSplit[urlSplit.length - 1]
                }`;
                const { data, error } = await supabase.storage
                    .from("files")
                    .remove([`${path}`]);
                if (data && data.length > 0) {
                    getFilesCallback();
                    toast.dismiss(toastId);
                }
                if (error) {
                    console.log(error);
                }
            }
        );
    };

    useEffect(() => {
        getFilesCallback();
    }, []);

    useEffect(() => {
        if (!isOpenDelModal && delFile && isDelete) {
            deleteFile(delFile);
        }
    }, [isOpenDelModal]);
    return (
        <>
            <span className="flex justify-between items-center text-black">
                <span className="text-3xl font-medium w-1/4">Documents</span>
                <div className="flex gap-4 items-center w-2/4">
                    <div className="flex-1 relative">
                        <input
                            placeholder="search"
                            className="pl-4 pr-9 w-full relative rounded-lg outline-none bg-white text-black border-2 border-[#BEBEBE] py-1"
                        />
                        <MagnifyingGlassIcon className="absolute right-2 top-2 h-6 w-6 text-[#7C7C7C]" />
                    </div>
                    <button
                        onClick={() => {
                            setIsOpen(true);
                        }}
                        className="rounded-xl bg-[#424760] px-4 py-2 text-white"
                    >
                        Add document
                    </button>
                </div>
            </span>
            <div className="flex gap-24">
                {files.length > 0 &&
                    files.map((file, index) => {
                        return (
                            <div
                                key={index}
                                onMouseEnter={() => {
                                    setHoverIcon(index);
                                }}
                                onMouseLeave={() => {
                                    setHoverIcon(-1);
                                }}
                                className="flex flex-col w-fit rounded-lg p-4 gap-4 hover:shadow-2xl hover:border"
                            >
                                <div
                                    className={`flex gap-4 justify-end text-[#817D7D] ${
                                        index === hoverIcon
                                            ? "visible"
                                            : "invisible"
                                    }`}
                                >
                                    <button
                                        onClick={() => {
                                            if (file.id) {
                                                setDelFile(file);
                                                setIsOpenDelModal(true);
                                            }
                                        }}
                                    >
                                        <Trash size={20} />
                                    </button>
                                    <button>
                                        <Dropdown
                                            placement="bottom"
                                            menu={{
                                                items: [
                                                    {
                                                        label: "download",
                                                        key: 0,
                                                        onClick: () => {
                                                            downloadFn(
                                                                file.path
                                                            );
                                                        },
                                                    },
                                                ],
                                            }}
                                            trigger={["click"]}
                                        >
                                            <a
                                                onClick={(e) =>
                                                    e.preventDefault()
                                                }
                                            >
                                                <DotsVertical size={20} />
                                            </a>
                                        </Dropdown>
                                    </button>
                                </div>

                                <a
                                    href={`${file.path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Image
                                        priority={true}
                                        src={getExtension(file.path)}
                                        alt="pdf image"
                                        width={150}
                                        height={150}
                                    />
                                </a>
                                {file.name && file.name.length > 0 && (
                                    <span className="text-black text-center">
                                        {file.name}
                                    </span>
                                )}
                            </div>
                        );
                    })}
            </div>
            <DocumentModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                getFilesCallback={getFilesCallback}
            />
            <DeleteModal
                title="Delete File"
                description="Are you sure you want to delete?"
                isOpen={isOpenDelModal}
                setIsOpen={setIsOpenDelModal}
                setIsDelete={setIsDelete}
            />
        </>
    );
};
