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
    );
}
