import { useRouter } from "next/router";
import React from "react";
import { Fragment, useEffect, useState } from "react";
import AllUser from "src/components/allUser";
import { UserStatus } from "src/interfaces/UserState";
import {
    ArrowLeft,
    ChevronDown,
    Mail,
    User,
    UserCircle,
} from "tabler-icons-react";
import { useUserStore } from "../stores/UserStore";

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

export default function About() {
    const { userStatus } = useUserStore((state) => state.user);
    const router = useRouter();
    const { pathname } = useRouter();
    const { ct } = router.query;

    /** UseEffect **/
    useEffect(() => {
        if (userStatus === UserStatus.LOGGED_OUT) {
            router.push("/");
        }
    }, []);
    return <></>;
}
