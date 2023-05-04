import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { SignupSchema } from "src/schemas/SignupSchema";
import { Oval } from "react-loader-spinner";
import { BEinstance } from "src/utils/axios";
import { toast } from "react-hot-toast";

export default function Signup() {
    const [showPass, setShowPass] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const {
        register,
        setValue,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SignupFormProps>({
        mode: "onBlur",
        resolver: yupResolver(SignupSchema),
    });

    const handleOnSubmit = async (data: SignupFormProps) => {
        const { confirmPassword, ...body } = data;
        setShowLoader(true);
        await BEinstance.post("/users/register", body)
            .then(() => {
                setTimeout(() => {
                    setShowSuccess(true);
                    reset();
                }, 1000);
            })
            .catch((err) => {
                setTimeout(() => {
                    toast.error(err.response.data.message);
                    setShowLoader(false);
                    setShowSuccess(false);
                }, 1000);
            });
    };
    return showLoader ? (
        <div className="flex items-center justify-center mt-10 w-full">
            {showSuccess ? (
                <div className="flex flex-col gap-10">
                    <span className="text-4xl w-full">
                        Successfully Created Account!
                    </span>
                    <span className="text-center">
                        Click{" "}
                        <a href="/" className="text-blue-500">
                            here
                        </a>{" "}
                        to go back to login page
                    </span>
                </div>
            ) : (
                <Oval
                    color="black"
                    secondaryColor="gray"
                    height={150}
                    width={150}
                />
            )}
        </div>
    ) : (
        <form
            className="flex flex-col gap-6 items-center"
            onSubmit={handleSubmit((data) => handleOnSubmit(data))}
        >
            <span className="text-4xl font-medium mb-6">Sign Up</span>
            <div className="w-full">
                <input
                    {...register("firstName")}
                    onChange={(e) => {
                        setValue("firstName", e.target.value);
                    }}
                    className="w-full bg-[#E9E9E9] rounded-md outline-none py-2 px-4"
                    placeholder="First name"
                />
            </div>
            <div className="w-full">
                <input
                    {...register("lastName")}
                    onChange={(e) => {
                        setValue("lastName", e.target.value);
                    }}
                    className="w-full bg-[#E9E9E9] rounded-md outline-none py-2 px-4"
                    placeholder="Last name"
                />
            </div>
            <div className="w-full">
                <input
                    {...register("email")}
                    onChange={(e) => {
                        setValue("email", e.target.value);
                    }}
                    className="w-full bg-[#E9E9E9] rounded-md outline-none py-2 px-4"
                    placeholder="Email"
                />
            </div>
            <div className="w-full relative">
                <input
                    {...register("password")}
                    onChange={(e) => {
                        setValue("password", e.target.value);
                    }}
                    className="w-full bg-[#E9E9E9] rounded-md outline-none py-2 px-4"
                    placeholder="Password"
                    type={`${showPass ? "text" : "password"}`}
                />
                <span onClick={() => setShowPass(!showPass)}>
                    {showPass ? (
                        <EyeSlashIcon className="absolute hover:cursor-pointer right-2 top-3 w-6 h-6" />
                    ) : (
                        <EyeIcon className="absolute hover:cursor-pointer right-2 top-3 w-6 h-6" />
                    )}
                </span>
            </div>
            {errors.confirmPassword?.message && (
                <span className="text-red-500 text-left w-full pl-2">
                    {errors.confirmPassword.message}
                </span>
            )}
            <div className="w-full">
                <input
                    {...register("confirmPassword")}
                    onChange={(e) => {
                        setValue("confirmPassword", e.target.value);
                    }}
                    className={`w-full bg-[#E9E9E9] rounded-md outline-none py-2 px-4`}
                    placeholder="Confirm Password"
                    type="password"
                />
            </div>
            <button
                type="submit"
                className="bg-[#424760] rounded-lg text-white px-4 py-2"
            >
                Create Account
            </button>
            <span className="text-[#575757]">
                Already have an account?{" "}
                <a href="/" className="text-blue-500">
                    Log in
                </a>
            </span>
        </form>
    );
}

export interface SignupFormProps {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}
