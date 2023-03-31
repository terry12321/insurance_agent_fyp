import { useRouter } from "next/router";
import { FormEvent, useCallback, useState } from "react";
import toast from "react-hot-toast";
import ResetPasswordComponent from "src/components/password/ResetPasswordComponent";
import { BEinstance } from "src/utils/axios";

export default function ResetPassword() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState("");

    const handleClick = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            await BEinstance.post("/authentication/forget-password", {
                email: email,
            })
                .then((value) => {
                    if (value.data) {
                        setEmailSent(value.data);
                    }
                })
                .catch((err) => {
                    toast.error(
                        "Error while sending email, please check if email exists! If not please contact the administrator."
                    );
                });
        },
        [email]
    );

    return router.query.id ? (
        <ResetPasswordComponent />
    ) : emailSent.length > 0 ? (
        <div>
            <span className="text-5xl">{emailSent}</span>
        </div>
    ) : (
        <div className="flex flex-col w-full gap-10 items-center">
            <span className="text-6xl text-center">Reset Password</span>
            <span className="text-center w-5/6">
                Enter the email address you registered with and we&apos;ll send
                you a link to reset your password.
            </span>
            <form
                className="w-full flex flex-col justify-center items-center gap-6"
                onSubmit={(e) => handleClick(e)}
            >
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg bg-[#E9E9E9] focus:ring-0 focus:outline-none p-2"
                    placeholder="Email"
                />
                <button
                    type="submit"
                    className="bg-[#424760] text-white rounded-lg py-2 px-4 w-fit"
                >
                    Send Mail
                </button>
            </form>
        </div>
    );
}
