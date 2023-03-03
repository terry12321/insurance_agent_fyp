import { useRouter } from "next/router";
import { useUserStore } from "src/stores/UserStore";

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
            <div className="flex h-full flex-col justify-between bg-btnColor-300 bg-white px-10 text-black">
                <div className="flex flex-col gap-6 mt-40">
                    <a href="/home">
                        <button
                            className={`rounded-lg w-full hover:bg-cyan-100 text-center hover:text-white py-2 ${
                                pathname === "/home"
                                    ? "bg-cyan-100 text-white"
                                    : ""
                            }`}
                        >
                            Client Portfolio
                        </button>
                    </a>
                    <a href="/detailForm">
                        <button
                            className={`rounded-lg w-full hover:bg-cyan-100 hover:text-white py-2 ${
                                pathname === "/detailForm"
                                    ? "bg-cyan-100 text-white"
                                    : ""
                            }`}
                        >
                            Client Detail Form
                        </button>
                    </a>
                    <a href="/forum">
                        <button
                            className={`rounded-lg w-full hover:bg-cyan-100 hover:text-white py-2 ${
                                pathname === "/forum"
                                    ? "bg-cyan-100 text-white"
                                    : ""
                            }`}
                        >
                            Forum
                        </button>
                    </a>
                </div>
                <div className="flex justify-center items-center mb-10">
                    <button
                        className="bg-black/50 hover:bg-black w-1/2 text-white text-center rounded-lg py-2"
                        onClick={handleLogout}
                    >
                        logout
                    </button>
                </div>
            </div>
        </>
    );
};
export default Sidebar;
