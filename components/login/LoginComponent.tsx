import Router from "next/router";
import React, {
    MouseEventHandler,
    useCallback,
    useEffect,
    useState,
} from "react";
import { useUserStore } from "../../stores/UserStore";

const LoginComponent = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const login = useUserStore((state) => state.login);
    const logout = useUserStore((state) => state.logout);
    const { userStatus } = useUserStore((state) => state.user);
    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        (event) => {
            if (!event.defaultPrevented) {
                login(username, password)
                    .then((response) => {
                        console.log(response);
                        if (response) {
                            Router.push("about");
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        },
        [username, password]
    );

    const handleDisconnect = useCallback(async () => {
        const hasLoggedOut = await logout();
    }, [logout, Router]);

    useEffect(() => {
        console.log(userStatus);
    }, [userStatus]);

    // const login = async () => {
    //     try {
    //         const result = await FEinstance.post("/api/auth", {
    //             username: username,
    //             password: password,
    //         });
    //         if (result && result.status === 200) {
    //             Router.push("about");
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    return (
        <>
            <div className="w-7/12 text-cyan-100 flex flex-col justify-center items-center">
                <span className="text-center text-7xl font-bold rounded-full py-10 px-20 border-dotted border-8 border-cyan-100 w-fit flex flex-col">
                    <span>Welcome to</span>
                    <span>FA-Guardix</span>
                </span>
            </div>
            <div className="bg-cyan-100 text-black w-5/12">
                <div className="flex flex-col gap-12 justify-center items-center h-full">
                    <span className="text-4xl text-white">Login</span>
                    <div className="flex flex-col gap-2 w-full items-center mb-24">
                        <input
                            className="rounded-lg p-2 bg-white w-2/4 focus:outline-none focus:ring focus:ring-cyan-500"
                            type={"text"}
                            placeholder="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            className="rounded-lg p-2 bg-white w-2/4 focus:outline-none focus:ring focus:ring-cyan-500"
                            type={"password"}
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            onClick={(event) => handleClick(event)}
                            className="bg-white rounded-full px-4 py-1 mt-2 text-white-500 hover:bg-cyan-200 hover:text-white"
                        >
                            login
                        </button>
                        <button onClick={() => handleDisconnect}>logout</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginComponent;
