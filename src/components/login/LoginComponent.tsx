import { useRouter } from "next/router";
import React, { FormEvent, useCallback, useState } from "react";
import { useUserStore } from "src/stores/UserStore";
import {toast, Toaster} from 'react-hot-toast'

const LoginComponent = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const login = useUserStore((state) => state.login);
    const router = useRouter();
    const handleClick = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            login(username, password)
                .then((response) => {
                    console.log(response);
                    if (response.data.accessToken) {
                        router.push("/home");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    toast.error("Incorrect username or password. Please try again!")
                });
        },
        [username, password]
    );
    return (
        <>
            <div className="w-7/12 text-cyan-100 flex flex-col justify-center items-center">
                <span className="text-center text-7xl font-bold rounded-full py-10 px-20 border-dotted border-8 border-cyan-100 w-fit flex flex-col">
                    <span>Welcome to</span>
                    <span>FA-Guardix</span>
                </span>
            </div>
            <form
                onSubmit={(e) => handleClick(e)}
                className="bg-cyan-100 text-black w-5/12"
            >
                <div className="flex flex-col gap-12 justify-center items-center h-full">
                    <span className="text-4xl text-white">Login</span>
                    <div className="flex flex-col gap-2 w-full items-center mb-24">
                        <input
                            className="rounded-lg p-2 bg-white w-2/4 focus:outline-none focus:ring focus:ring-cyan-500"
                            type={"text"}
                            placeholder="username"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            className="rounded-lg p-2 bg-white w-2/4 focus:outline-none focus:ring focus:ring-cyan-500"
                            type={"password"}
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="bg-white rounded-full px-4 py-1 mt-2 text-white-500 hover:bg-cyan-200 hover:text-white"
                        >
                            login
                        </button>
                    </div>
                </div>
            </form>
            <Toaster position="bottom-right" reverseOrder={false} toastOptions={{ duration: 3000 }}/>
        </>
    );
};

export default LoginComponent;
