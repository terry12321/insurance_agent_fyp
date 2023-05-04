import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useEffect } from "react";
import { UserStatus } from "src/interfaces/UserState";
import { Table } from "antd";
import { useUserStore } from "../stores/UserStore";
import { Trash } from "tabler-icons-react";
import {
    AddClientModal,
    ClientFormProps,
    handleDelete,
} from "src/components/home/AddClientModal";
import { BEinstance } from "src/utils/axios";
import {
    ClientInterface,
    Occupation,
} from "src/components/home/interface/ClientInterface";
import { toast } from "react-hot-toast";

export const getOccuption = async (
    setOccupation: React.Dispatch<React.SetStateAction<Occupation[]>>
) => {
    await BEinstance.get("/client/get-all-occupation").then((value) => {
        console.log(value)
        if (value.data) {
            setOccupation(value.data);
        }
    });
};

export default function Home() {
    const { userStatus } = useUserStore((state) => state.user);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [occupation, setOccupation] = useState<Array<Occupation>>([]);
    const [data, setData] = useState([]);

    const router = useRouter();

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "",
            dataIndex: "age",
            width: "100px",
        },
    ];
    const deleteClient = async (id: number, profileImage: string) => {
        await BEinstance.delete(`/client/${id}`).then((value) => {
            if (value.data) {
                if (profileImage !== "") {
                    handleDelete(profileImage);
                }
                getAllClient();
                toast.success("Successfully deleted client!");
            }
        });
    };

    const getAllClient = useCallback(async () => {
        await BEinstance.get("/client").then((value) => {
            if (value.data && value.data.length > 0) {
                const dataArray = value.data.map(
                    (data: ClientInterface, i: number) => {
                        return {
                            key: data.id,
                            name: (
                                <div>
                                    {
                                        <a
                                            href={`/home/client/${data.id}`}
                                            className="flex items-center gap-4 text-xl 2xl:text-2xl"
                                        >
                                            <img
                                                width={70}
                                                height={70}
                                                className="rounded-full"
                                                src={
                                                    data.profileImage === ""
                                                        ? "/images/default-profile.png"
                                                        : data.profileImage
                                                }
                                            />{" "}
                                            {data.name}
                                        </a>
                                    }
                                </div>
                            ),
                            age: (
                                <button
                                    className="flex gap-2 text-[#817D7D]"
                                    onClick={() => {
                                        deleteClient(
                                            data.id,
                                            data.profileImage
                                        );
                                    }}
                                >
                                    <Trash />
                                    Delete
                                </button>
                            ),
                        };
                    }
                );
                setData(dataArray);
            } else {
                setData([]);
            }
        });
    }, []);

    const uploadClient = useCallback(async (clientData: ClientFormProps) => {
        if (clientData !== null) {
            const body = {
                profileImage: clientData.profileImage,
                name: clientData.name,
                NRIC: clientData.NRIC,
                contactNo: clientData.contactNo,
                email: clientData.email,
                address: clientData.address,
                occupation: clientData.occupation,
            };
            await BEinstance.post("/client", body)
                .then((value) => {
                    if (value.data) {
                        toast.success("Successfully added client!");
                        getAllClient();
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    /** UseEffect **/
    useEffect(() => {
        if (userStatus === UserStatus.LOGGED_OUT) {
            router.push("/");
        }
        getOccuption(setOccupation);
        getAllClient();
    }, []);

    return (
        <div className="flex flex-col gap-10 w-5/6 py-24">
            <div className="flex justify-between text-black">
                <span className="font-medium text-4xl">Clients</span>
                <button
                    onClick={() => setIsOpenModal(true)}
                    className="px-10 py-2 rounded-xl bg-[#424760] text-white"
                >
                    Add client
                </button>
            </div>
            <Table
                showHeader={false}
                columns={columns}
                dataSource={data}
                pagination={{
                    position: ["bottomCenter"],
                    simple: false,
                    pageSize: 8,
                }}
            />
            <AddClientModal
                setIsOpen={setIsOpenModal}
                isOpen={isOpenModal}
                occupation={occupation}
                uploadClient={uploadClient}
            />
        </div>
    );
}
