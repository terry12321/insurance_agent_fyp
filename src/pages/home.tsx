import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { UserStatus } from "src/interfaces/UserState";
import { Table } from "antd";
import { useUserStore } from "../stores/UserStore";
import { Trash } from "tabler-icons-react";
import { AddClientModal } from "src/components/home/AddClientModal";
import { BEinstance } from "src/utils/axios";
import { Occupation } from "src/components/home/interface/ClientInterface";

export default function About() {
    const { userStatus } = useUserStore((state) => state.user);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [occupation, setOccupation] = useState<Array<Occupation>>([]);
    const [selectedOccupation, setSelectedOccupation] = useState("");
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

    const data = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            key: i,
            name: (
                <div
                    className="flex items-center gap-4 text-xl 2xl:text-2xl"
                >
                    {i === 3 ? (
                        <>
                            <img
                                width={70}
                                height={70}
                                className="rounded-full"
                                src="/images/default-profile.png"
                            />{" "}
                            Edward King {i}
                        </>
                    ) : (
                        <>
                            <img
                                width={70}
                                height={70}
                                className="rounded-full"
                                src="https://zqjnaztqbngpozcvewoi.supabase.co/storage/v1/object/public/files/userpicture/image%2010.png?t=2023-04-14T09%3A57%3A54.343Z"
                            />{" "}
                            Edward King {i}
                        </>
                    )}
                </div>
            ),
            age: (
                <button
                    className="flex gap-2 text-[#817D7D]"
                    onClick={() => {
                        console.log(i);
                    }}
                >
                    <Trash />
                    Delete
                </button>
            ),
        });
    }

    const getOccuption = async () => {
        await BEinstance.get("/client/get-all-occupation").then((value) => {
            if (value.data) {
                setOccupation(value.data);
            }
        });
    };

    /** UseEffect **/
    useEffect(() => {
        if (userStatus === UserStatus.LOGGED_OUT) {
            router.push("/");
        }
        getOccuption();
    }, []);

    return (
        <div className="flex flex-col gap-10 w-5/6 py-24">
            <div className="flex justify-between text-black">
                <span className="font-medium text-4xl">Clients</span>
                <button
                    onClick={() => setIsOpenModal(true)}
                    className="px-4 py-2 rounded-xl bg-[#424760] text-white"
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
                setSelectedOccupation={setSelectedOccupation}
            />
        </div>
    );
}
