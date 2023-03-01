import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import Sidebar from "src/components/layout/Sidebar";

const SharedLayout = ({ children }: { children: ReactNode }) => {
    const { pathname } = useRouter();

    const AuthedComponent = () => (
        <div className="">
            <div className="fixed h-screen w-2/12">
                <Sidebar />
            </div>
            <div className="fixed h-screen right-0 w-10/12">
            {children}
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
            <>
                {children}
                <Toaster
                    position="bottom-right"
                    reverseOrder={false}
                    toastOptions={{ duration: 3000 }}
                />
            </>
        );
    };

    if (pathname === "/404") return <>{children}</>;

    return (
        <>
            {/* Grid Column CSS Style */}
            <div className="text-lg">
                {pathname !== "/" ? <AuthedComponent /> : <LoginComponent />}
            </div>
        </>
    );
};

export default SharedLayout;
