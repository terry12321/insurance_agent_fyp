import { Disclosure, Transition } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { stat } from "fs";
import { useRouter } from "next/router";
import React from "react";
import { Fragment, useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import { UserStatus } from "src/interfaces/UserState";
import {
    ArrowLeft,
    ArrowLeftCircle,
    ArrowRightCircle,
    ArrowUpCircle,
    ChevronDown,
    ChevronUp,
    Mail,
    Underline,
    User,
    UserCircle,
} from "tabler-icons-react";
import { useUserStore } from "../stores/UserStore";

const variants = {
    enter: ({ direction, width }: SliderVariant) => ({
        x: direction * width,
    }),
    center: { x: 0 },
    exit: ({ direction, width }: SliderVariant) => ({
        x: direction * -width,
    }),
};

export default function About() {
    const { userStatus } = useUserStore((state) => state.user);
    const router = useRouter();
    const { ct } = router.query;
    const [count, setCount] = useState(1);
    const [tuple, setTuple] = useState([0, count]); // [prev,current]
    const [ref, { width }] = useMeasure();
    const [displayArr, setDisplayArr] = useState<Array<User>>([]);
    const userArr = [
        { name: "Terry1", email: "TerryTan1@gmail.com" },
        { name: "Terry2", email: "TerryTan2@gmail.com" },
        { name: "Terry3", email: "TerryTan3@gmail.com" },
        { name: "Terry4", email: "TerryTan4@gmail.com" },
        { name: "Terry5", email: "TerryTan5@gmail.com" },
        { name: "Terry6", email: "TerryTan6@gmail.com" },
        { name: "Terry7", email: "TerryTan7@gmail.com" },
        { name: "Terry8", email: "TerryTan8@gmail.com" },
        { name: "Terry9", email: "TerryTan9@gmail.com" },
        { name: "Terry10", email: "TerryTan10@gmail.com" },
        { name: "Terry11", email: "TerryTan11@gmail.com" },
        { name: "Terry12", email: "TerryTan12@gmail.com" },
        { name: "Terry13", email: "TerryTan13@gmail.com" },
        { name: "Terry14", email: "TerryTan14@gmail.com" },
        { name: "Terry15", email: "TerryTan15@gmail.com" },
        { name: "Terry16", email: "TerryTan16@gmail.com" },
        { name: "Terry17", email: "TerryTan17@gmail.com" },
        { name: "Terry18", email: "TerryTan18@gmail.com" },
        { name: "Terry19", email: "TerryTan19@gmail.com" },
        { name: "Terry20", email: "TerryTan20@gmail.com" },
        { name: "Terry21", email: "TerryTan21@gmail.com" },
        { name: "Terry22", email: "TerryTan22@gmail.com" },
        { name: "Terry23", email: "TerryTan23@gmail.com" },
        { name: "Terry24", email: "TerryTan24@gmail.com" },
        { name: "Terry25", email: "TerryTan25@gmail.com" },
        { name: "Terry26", email: "TerryTan26@gmail.com" },
        { name: "Terry27", email: "TerryTan27@gmail.com" },
        { name: "Terry28", email: "TerryTan28@gmail.com" },
    ];
    const pages = Math.ceil(userArr.length / 6);

    const prev = usePrevious(count);
    if (ct) {
        console.log(ct);
    }

    if (tuple[1] !== count) {
        setTuple([tuple[1], count]);
    }
    const direction = count > prev ? 1 : -1;

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

    useEffect(() => {
        const startIndex = (count - 1) * 6;
        const finalIndex = startIndex + 6;
        setDisplayArr(userArr.slice(startIndex, finalIndex));
    }, [count, direction]);
    return (
        <div className="flex h-5/6 items-center justify-center border-[3px] border-cyan-600 w-5/6 px-4 py-10 rounded-[24px] bg-white text-black">
            {ct ? (
                /***** Client Portfolio's page *****/
                <>
                    <div className="w-4/12 px-10 border-r-2 h-full border-gray-400 flex flex-col justify-start gap-8 items-center">
                        <a className="w-full" href="/home">
                            <div className="flex items-center text-left text-gray-400 my-10 pl-4">
                                <ArrowLeft className="h-8 w-8" />
                                Go back
                            </div>
                        </a>
                        <UserCircle className="text-cyan-500 h-40 w-40" />
                        <div className="flex gap-2 flex-col border-y-2 p-6">
                            <div className="flex gap-2 items-center">
                                <User className="h-6 w-6 text-cyan-500" />{" "}
                                {userArr[Number(ct)].name}
                            </div>
                            <div className="flex gap-2 items-center">
                                <Mail className="h-6 w-6 text-cyan-500" />
                                {userArr[Number(ct)].email}
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
                                            className={`flex w-full justify-between items-center ${
                                                isOpen
                                                    ? "rounded-t-lg"
                                                    : "rounded-lg"
                                            } bg-cyan-600 px-4 py-2 text-left font-medium text-white hover:bg-cyan-700`}
                                            onClick={() => handleClick(id)}
                                            aria-expanded={isOpen}
                                            {...(isOpen && {
                                                "aria-controls": id,
                                            })}
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
                </>
            ) : (
                /****** Display all Client ******/
                <>
                    <div className="w-1/6 flex justify-center">
                        <button
                            className={`disabled:bg-gray-500 bg-cyan-500 rounded-full`}
                            onClick={() => {
                                setCount(count - 1);
                            }}
                            disabled={count === 1}
                        >
                            <ArrowUpCircle className="h-10 w-10 -rotate-90 text-white" />
                        </button>
                    </div>
                    <div
                        ref={ref}
                        className="relative flex w-full h-full items-center justify-center overflow-hidden"
                    >
                        <AnimatePresence custom={{ direction, width }}>
                            <motion.div
                                key={count + 1}
                                variants={variants}
                                custom={{ direction, width }}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className={`absolute flex w-[90%] h-[90%] items-center justify-center`}
                            >
                                <div className="grid grid-cols-3 justify-items-center content-center w-full h-full gap-6">
                                    {displayArr.map((user, index) => {
                                        return (
                                            <a
                                                key={index}
                                                href={`/home?ct=${index}`}
                                            >
                                                <div className="flex flex-col items-center">
                                                    <UserCircle className="text-cyan-500 h-40 w-40" />
                                                    {user.name}
                                                </div>
                                            </a>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    <div className="w-1/6 flex justify-center">
                        <button
                            className={`disabled:bg-gray-500 bg-cyan-500 rounded-full`}
                            onClick={() => {
                                setCount(count + 1);
                            }}
                            disabled={count === pages}
                        >
                            <ArrowUpCircle className="h-10 w-10 rotate-90 text-white" />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

interface SliderVariant {
    direction: number;
    width: number;
}

interface User {
    name: string;
}

function usePrevious(state: number) {
    const [tuple, setTuple] = useState([0, state]); // [prev,current]

    if (tuple[1] !== state) {
        setTuple([tuple[1], state]);
    }
    return tuple[0];
}
