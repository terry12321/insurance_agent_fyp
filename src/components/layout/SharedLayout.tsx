import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import Sidebar from "src/components/layout/Sidebar";
import Image from "next/image";

const SharedLayout = ({ children }: { children: ReactNode }) => {
    const { pathname } = useRouter();
    const router = useRouter();

    const AuthedComponent = () => (
        <div className="flex">
            <div className="w-2/12">
                <Sidebar />
            </div>
            <div className="w-10/12 bg-white h-screen overflow-y-auto py-10">
                <div className="flex justify-center items-center my-auto">
                    {children}
                </div>
            </div>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
                toastOptions={{ duration: 3000 }}
            />
        </div>
    );

    const LoginComponent = () => {
        return (
            <div className="flex flex-col h-screen">
                <div className="flex w-full h-[12%] 2xl:h-[8%] py-10">
                    <span
                        className="flex items-center px-14 hover:cursor-pointer"
                        onClick={() => router.push("/")}
                    >
                        <Image
                            alt={"FA-Guardix"}
                            width={250}
                            height={250}
                            src={"/images/logo.svg"}
                        />
                    </span>
                </div>
                <div className="flex justify-center bg-white h-[88%] 2xl:h-[92%] py-40 text-black">
                    <div className="w-4/12 2xl:w-3/12">{children}</div>
                </div>
                <Toaster
                    position="bottom-right"
                    reverseOrder={false}
                    toastOptions={{ duration: 3000 }}
                />
            </div>
        );
    };

    if (pathname === "/404") return <>{children}</>;

    return (
        <>
            {/* Grid Column CSS Style */}
            <div className="text-lg">
                {pathname !== "/" && pathname !== "/resetPassword" ? (
                    <AuthedComponent />
                ) : (
                    <LoginComponent />
                )}
            </div>
        </>
    );
};

export default SharedLayout;
