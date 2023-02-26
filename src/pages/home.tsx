import { useRouter } from "next/router";
import { useEffect } from "react";
import { UserStatus } from "src/interfaces/UserState";
import { useUserStore } from "../stores/UserStore";

export default function About() {
    const { userStatus } = useUserStore((state) => state.user);
    const logout = useUserStore((state) => state.logout);
    const router = useRouter();

    const handleLogout = async () => {
        await logout().then((response) => {
            if (response) {
                router.push("/");
            }
        });
    };

    /** UseEffect **/
    useEffect(() => {
        if (userStatus === UserStatus.LOGGED_OUT) {
            router.push("/");
        }
    }, []);
    // const authenticated = verifyJWTToken();
    // console.log(authenticated);
    return (
        <div className="flex flex-col justify-center items-center">
            <span>cao ni mei</span>
            <button
                className="bg-black rounded-full p-2"
                onClick={() => handleLogout()}
            >
                logout
            </button>
        </div>
    );
}
