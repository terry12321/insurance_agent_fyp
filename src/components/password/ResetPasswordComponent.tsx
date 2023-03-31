import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BEinstance } from "src/utils/axios";

const ResetPasswordComponent = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [showResetPass, setShowResetPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const router = useRouter();

    const handleClick = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (errorMsg.length === 0) {
                await BEinstance.post("/authentication/reset-password", {
                    id: router.query.id,
                    token: router.query.token,
                    newPassword: newPassword,
                })
                    .then((value) => {
                        if (value) {
                            setShowSuccess(true);
                            setTimeout(() => {
                                router.push("/");
                            }, 3000);
                        }
                    })
                    .catch((err) => {
                        if (
                            err.response.data.name === "JsonWebTokenError" ||
                            err.response.data.name === "TokenExpiredError"
                        ) {
                            toast.error(
                                "The reset link has expired please go back to the home page and try again!"
                            );
                        }
                    });
            }
        },
        [errorMsg, confirmPassword, newPassword]
    );

    useEffect(() => {
        if (confirmPassword !== newPassword) {
            setErrorMsg("Password is not the same!");
        } else {
            setErrorMsg("");
        }
    }, [confirmPassword]);

    return (
        <div className="flex flex-col w-full gap-10 items-center">
            {showSuccess ? (
                <span className="text-4xl">
                    Reset success! Please hold while we redirect you to login...
                </span>
            ) : (
                <>
                    <span className="text-6xl text-center">New Password</span>
                    <form
                        className="w-full flex flex-col justify-center items-center gap-6"
                        onSubmit={(e) => handleClick(e)}
                    >
                        <label className="w-full relative">
                            <input
                                type={`${showResetPass ? "text" : "password"}`}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full rounded-lg bg-[#E9E9E9] focus:ring-0 focus:outline-none px-4 py-2"
                                placeholder="New Password"
                            />
                            <span
                                onClick={() => setShowResetPass(!showResetPass)}
                            >
                                {showResetPass ? (
                                    <EyeSlashIcon className="absolute hover:cursor-pointer right-2 top-3 w-6 h-6" />
                                ) : (
                                    <EyeIcon className="absolute hover:cursor-pointer right-2 top-3 w-6 h-6" />
                                )}
                            </span>
                        </label>
                        <label className="w-full relative">
                            <input
                                type={`${
                                    showConfirmPass ? "text" : "password"
                                }`}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                className="w-full rounded-lg bg-[#E9E9E9] focus:ring-0 focus:outline-none px-4 py-2"
                                placeholder="Confirm Password"
                            />
                            <span
                                onClick={() =>
                                    setShowConfirmPass(!showConfirmPass)
                                }
                            >
                                {showConfirmPass ? (
                                    <EyeSlashIcon className="absolute hover:cursor-pointer right-2 top-3 w-6 h-6" />
                                ) : (
                                    <EyeIcon className="absolute hover:cursor-pointer right-2 top-3 w-6 h-6" />
                                )}
                            </span>
                            {errorMsg && (
                                <span className="text-red-500">{errorMsg}</span>
                            )}
                        </label>
                        <button
                            type="submit"
                            className="bg-[#424760] text-white rounded-lg py-2 px-4 w-fit"
                        >
                            Reset Password
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};

export default ResetPasswordComponent;
