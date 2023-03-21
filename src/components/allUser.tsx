import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import { ArrowUpCircle, UserCircle } from "tabler-icons-react";

interface SliderVariant {
    direction: number;
    width: number;
}

interface User {
    name: string;
}
const variants = {
    enter: ({ direction, width }: SliderVariant) => ({
        x: direction * width,
    }),
    center: { x: 0 },
    exit: ({ direction, width }: SliderVariant) => ({
        x: direction * -width,
    }),
};

function usePrevious(state: number) {
    const [tuple, setTuple] = useState([0, state]); // [prev,current]

    if (tuple[1] !== state) {
        setTuple([tuple[1], state]);
    }
    return tuple[0];
}
export default function AllUser({ path }: { path: string }) {
    const [count, setCount] = useState(1);
    const [tuple, setTuple] = useState([0, count]); // [prev,current]
    const [ref, { width }] = useMeasure();
    const [displayArr, setDisplayArr] = useState<Array<User>>([]);

    const userArr = [
        {
            name: "User1",
            email: "TUser1@gmail.com",
            sex: "",
            NRIC: "",
            address: "",
        },
        {
            name: "User2",
            email: "TUser2@gmail.com",
            sex: "",
            NRIC: "",
            address: "",
        },
        {
            name: "User3",
            email: "TUser3@gmail.com",
            sex: "",
            NRIC: "",
            address: "",
        },
        {
            name: "User4",
            email: "TUser4@gmail.com",
            sex: "",
            NRIC: "",
            address: "",
        },
        {
            name: "User5",
            email: "TUser5@gmail.com",
            sex: "",
            NRIC: "",
            address: "",
        },
        {
            name: "User6",
            email: "TUser6@gmail.com",
            sex: "",
            NRIC: "",
            address: "",
        },
        {
            name: "User7",
            email: "TUser7@gmail.com",
            sex: "",
            NRIC: "",
            address: "",
        },
        {
            name: "User8",
            email: "TUser8@gmail.com",
            sex: "",
            NRIC: "",
            address: "",
        },
        {
            name: "User9",
            email: "TUser9@gmail.com",
            sex: "",
            NRIC: "",
            address: "",
        },
        {
            name: "User10",
            email: "Usern10@gmail.com",
            sex: "",
            NRIC: "",
            address: "",
        },
        {
            name: "User11",
            email: "Usern11@gmail.com",
            sex: "",
            NRIC: "",
            address: "",
        },
        {
            name: "User12",
            email: "Usern12@gmail.com",
            sex: "",
            NRIC: "",
            address: "",
        },
        {
            name: "User13",
            email: "Usern13@gmail.com",
            sex: "",
            NRIC: "",
            address: "",
        },
        {
            name: "User14",
            email: "Usern14@gmail.com",
            sex: "",
            NRIC: "",
            address: "",
        },
        {
            name: "User15",
            email: "Usern15@gmail.com",
            sex: "",
            NRIC: "",
            address: "",
        },
        {
            name: "User16",
            email: "Usern16@gmail.com",
            sex: "",
            NRIC: "",
            address: "",
        },
        {
            name: "User17",
            email: "Usern17@gmail.com",
            sex: "",
            NRIC: "",
            address: "",
        },
        {
            name: "User18",
            email: "Usern18@gmail.com",
            sex: "",
            NRIC: "",
            address: "",
        },
        {
            name: "User19",
            email: "Usern19@gmail.com",
            sex: "",
            NRIC: "",
            address: "",
        },
        {
            name: "User20",
            email: "Usern20@gmail.com",
            sex: "",
            NRIC: "",
            address: "",
        },
        {
            name: "User21",
            email: "Usern21@gmail.com",
            sex: "",
            NRIC: "",
            address: "",
        },
        {
            name: "User22",
            email: "Usern22@gmail.com",
            sex: "",
            NRIC: "",
            address: "",
        },
        {
            name: "User23",
            email: "Usern23@gmail.com",
            sex: "",
            NRIC: "",
            address: "",
        },
        {
            name: "User24",
            email: "Usern24@gmail.com",
            sex: "",
            NRIC: "",
            address: "",
        },
        {
            name: "User25",
            email: "Usern25@gmail.com",
            sex: "",
            NRIC: "",
            address: "",
        },
        {
            name: "User26",
            email: "Usern26@gmail.com",
            sex: "",
            NRIC: "",
            address: "",
        },
        {
            name: "User27",
            email: "Usern27@gmail.com",
            sex: "",
            NRIC: "",
            address: "",
        },
        {
            name: "User28",
            email: "Usern28@gmail.com",
            sex: "",
            NRIC: "",
            address: "",
        },
    ];
    const pages = Math.ceil(userArr.length / 6);

    const prev = usePrevious(count);

    if (tuple[1] !== count) {
        setTuple([tuple[1], count]);
    }
    const direction = count > prev ? 1 : -1;

    /** UseEffect **/
    useEffect(() => {
        const startIndex = (count - 1) * 6;
        const finalIndex = startIndex + 6;
        setDisplayArr(userArr.slice(startIndex, finalIndex));
    }, [count, direction]);
    return (
        <>
            <div className="w-1/6 flex justify-center items-center">
                <button
                    className={`disabled:bg-gray-500 bg-cyan-500 rounded-full`}
                    onClick={() => {
                        setCount(count - 1);
                    }}
                    disabled={count === 1}
                >
                    <ArrowUpCircle
                        size={60}
                        className="-rotate-90 text-white"
                    />
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
                                    <a key={index} href={`${path}?ct=${index}`}>
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
            <div className="w-1/6 flex justify-center items-center">
                <button
                    className={`disabled:bg-gray-500 bg-cyan-500 rounded-full`}
                    onClick={() => {
                        setCount(count + 1);
                    }}
                    disabled={count === pages}
                >
                    <ArrowUpCircle size={60} className="rotate-90 text-white" />
                </button>
            </div>
        </>
    );
}
