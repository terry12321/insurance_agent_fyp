import { useRouter } from "next/router";
import { ArrowDownCircle } from "tabler-icons-react";

export default function ClientTab({ isClient }: { isClient: boolean }) {
    const router = useRouter();
    const splitPath = router.asPath.split("/");
    return (
        <div className="flex justify-between text-black">
            <div className="flex flex-1 items-center">
                <a href="/home" className="flex items-center gap-2">
                    <ArrowDownCircle className="rotate-90" size={34} />
                    List of Clients
                </a>
            </div>

            <div className="flex gap-16 pl-4 py-4 items-center">
                <a
                    className={`${isClient ? "border-b-2 border-black" : ""}`}
                    href={`/home/client/${splitPath[splitPath.length - 1]}`}
                >
                    Client Details
                </a>
                <a
                    className={`${!isClient ? "border-b-2 border-black" : ""}`}
                    href={`/home/clientpolicy/${
                        splitPath[splitPath.length - 1]
                    }`}
                >
                    Client Policy
                </a>
            </div>
        </div>
    );
}
