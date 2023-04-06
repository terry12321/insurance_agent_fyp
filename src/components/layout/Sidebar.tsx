import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { useUserStore } from "src/stores/UserStore";
import { Logout, News } from "tabler-icons-react";

const Sidebar = () => {
    const { pathname } = useRouter();
    const router = useRouter();
    const logout = useUserStore((state) => state.logout);
    const handleLogout = async () => {
        await logout().then((response) => {
            if (response) {
                router.push("/");
            }
        });
    };

    return (
        <>
            <div className="flex h-full flex-col justify-between bg-btnColor-300 bg-black text-white">
                <div className="flex flex-col mt-40">
                    <a
                        href="/home"
                        className={`w-full hover:bg-white hover:text-black pl-4 2xl:pl-16 ${
                            pathname === "/home" ? "bg-white text-black" : ""
                        }`}
                    >
                        <button
                            className={`flex items-center justify-start gap-2 hover:bg-white text-2xl text-center hover:text-black py-8`}
                        >
                            <News className="h-8 w-8" />
                            Client Portfolio
                        </button>
                    </a>
                    <a
                        href="/bulletin"
                        className={`w-full hover:bg-white hover:text-black pl-4 2xl:pl-16 ${
                            pathname === "/bulletin"
                                ? "bg-white text-black"
                                : ""
                        }`}
                    >
                        <button
                            className={`flex items-center justify-start gap-2 hover:bg-white text-2xl hover:text-black py-8`}
                        >
                            <CalendarDaysIcon className="h-8 w-8" />
                            Bulletin Board
                        </button>
                    </a>
                    <span
                        className={`w-full hover:bg-white hover:text-black pl-4 2xl:pl-16`}
                    >
                        <button
                            className={`flex items-center justify-start gap-2 hover:bg-white text-2xl hover:text-black py-8`}
                            onClick={handleLogout}
                        >
                            <Logout className="h-8 w-8" />
                            Logout
                        </button>
                    </span>
                </div>
            </div>
        </>
    );
};
export default Sidebar;
