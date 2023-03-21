import { useRouter } from "next/router";
import React, { FormEvent, useCallback, useState } from "react";
import { useUserStore } from "src/stores/UserStore";
import { toast, Toaster } from "react-hot-toast";
import Image from "next/image";

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
                    toast.error(
                        "Incorrect username or password. Please try again!"
                    );
                });
        },
        [username, password]
    );
    return (
        <>
            <div className="w-full">
                <div className="flex bg-black w-full h-20">
                    <span className="flex items-center px-4">
                    <Image className="" alt={"FA-Guardix"} width={200} height={200} src={"/images/logo.svg"} />

                    </span>
                </div>
            </div>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
                toastOptions={{ duration: 3000 }}
            />
        </>
    );
};

export default LoginComponent;
