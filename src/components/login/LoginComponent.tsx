import { useRouter } from "next/router";
import React, { FormEvent, useCallback, useState } from "react";
import { useUserStore } from "src/stores/UserStore";
import { toast } from "react-hot-toast";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { isAxiosError } from "axios";

const LoginComponent = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const login = useUserStore((state) => state.login);
    const router = useRouter();
    const handleClick = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            login(username, password).then((response) => {
                if (response.data && response.data.accessToken) {
                    router.push("/home");
                } else if (isAxiosError(response)) {
                    const error = response;
                    if (error.response)
                        toast.error(error.response.data.message);
                }
            });
        },
        [username, password]
    );
    return (
        <div className="w-full">
            <div className="flex flex-col gap-10">
                <span className="text-6xl text-center">Sign in</span>
                <form
                    onSubmit={(e) => handleClick(e)}
                    className="flex flex-col gap-6"
                >
                    <input
                        type={"text"}
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-[#E9E9E9] focus:ring-0 focus:outline-none"
                    />
                    <label className="relative">
                        <input
                            type={showPass ? "text" : "password"}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full px-4 py-2 rounded-lg bg-[#E9E9E9] focus:ring-0 focus:outline-none"
                        />
                        <span onClick={() => setShowPass(!showPass)}>
                            {showPass ? (
                                <EyeSlashIcon className="absolute hover:cursor-pointer right-2 top-3 w-6 h-6" />
                            ) : (
                                <EyeIcon className="absolute hover:cursor-pointer right-2 top-3 w-6 h-6" />
                            )}
                        </span>
                    </label>
                    <a href="/resetPassword">Forget password?</a>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-[#424760] text-white rounded-lg p-2 w-3/12"
                        >
                            Sign In
                        </button>
                    </div>
                    <span className="text-center text-[#575757]">
                        New to FA-Guardix?{" "}
                        <a href="/signup" className="text-blue-500">
                            Join now
                        </a>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default LoginComponent;
