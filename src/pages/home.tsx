import { Disclosure, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React from "react";
import { Fragment, useEffect, useState } from "react";
import { UserStatus } from "src/interfaces/UserState";
import { ChevronDown, ChevronUp, Mail, Underline, User, UserCircle } from "tabler-icons-react";
import { useUserStore } from "../stores/UserStore";

export default function About() {
    const { userStatus } = useUserStore((state) => state.user);
    const router = useRouter();

    const [disclosures, setDisclosures] = useState([
        {
            id: "disclosure-panel-1",
            isOpen: false,
            buttonText: "Policy",
            panelText:
                "If you're unhappy with your purchase for any reason, email us within 90 days and we'll refund you in full, no questions asked.",
            SubData: [
                { name: "Death", amount: "$1,050,000" },
                { name: "Accidental Death", amount: "$2,000,000" },
                { name: "Critical illness", amount: "$950,100" },
            ],
        },
        {
            id: "disclosure-panel-2",
            isOpen: false,
            buttonText: "Premium",
            panelText: "No.",
            SubData: [{ name: "Accidental Death", amount: "$2,000,000" }],
        },
        {
            id: "disclosure-panel-3",
            isOpen: false,
            buttonText: "Coverage",
            panelText: "No.",
            SubData: [{ name: "Critical illness", amount: "$950,100" }],
        },
    ]);

    const handleClick = (id: string) => {
        setDisclosures(
            disclosures.map((d) =>
                d.id === id
                    ? { ...d, isOpen: !d.isOpen }
                    : { ...d, isOpen: false }
            )
        );
    };

    /** UseEffect **/
    useEffect(() => {
        if (userStatus === UserStatus.LOGGED_OUT) {
            router.push("/");
        }
    }, []);
    // const authenticated = verifyJWTToken();
    // console.log(authenticated);
    return (
        <div className="flex justify-center items-center my-auto h-screen">
            <div className="h-5/6 border-[3px] border-cyan-600 w-5/6 px-4 py-10 rounded-[150px] flex items-center justify-center bg-white text-black">
                <div className="w-4/12 px-10 border-r-2 h-full border-gray-400 flex flex-col gap-10 items-center">
                    <div className="h-2/6">
                        <UserCircle className="text-cyan-500 h-40 w-40" />
                    </div>
                    <div className="h-5/6">
                        <div className="flex gap-2 flex-col border-y-2 p-6">
                            <div className="flex gap-2 items-center">
                                <User className="h-6 w-6 text-cyan-500" /> Terry
                            </div>
                            <div className="flex gap-2 items-center">
                                <Mail className="h-6 w-6 text-cyan-500" />
                                TerryTan@gmail.com
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex relative h-full items-center justify-center w-8/12">
                    <div className="flex flex-col w-3/4 gap-4">
                        {disclosures.map(
                            ({
                                id,
                                isOpen,
                                buttonText,
                                panelText,
                                SubData,
                            }) => (
                                <div className="" key={id}>
                                    <button
                                        className={`flex w-full justify-between ${isOpen ? "rounded-t-lg":"rounded-lg"} bg-cyan-600 px-4 py-2 text-left font-medium text-white hover:bg-cyan-700`}
                                        onClick={() => handleClick(id)}
                                        aria-expanded={isOpen}
                                        {...(isOpen && { "aria-controls": id })}
                                    >
                                        {buttonText}
                                        <ChevronDown
                                            className={`${
                                                isOpen
                                                    ? "rotate-180 transform"
                                                    : ""
                                            } h-5 w-5 text-white`}
                                        />
                                    </button>
                                    {isOpen && (
                                        <div className="px-4 pt-4 pb-2 text-gray-500 border-x-2 border-b-2">
                                            {SubData.map((data, index) => {
                                                return (
                                                    <div
                                                        className="flex flex-col py-2"
                                                        key={index}
                                                    >
                                                        <span className="border-b-2 font-semibold">
                                                            {data.name}
                                                        </span>
                                                        <span>
                                                            {data.amount}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
