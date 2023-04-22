import { useRouter } from "next/router";
import ClientCommponent from "src/components/home/ClientComponent";
import ClientPolicyComponent from "src/components/home/ClientPolicyComponent";
import ClientTab from "src/components/home/ClientTab";

export default function Client() {
    const router = useRouter();
    const splitPath = router.asPath.split("/");
    const isClient = splitPath[splitPath.length - 2] === "client";
    return (
        <div className="w-5/6 flex flex-col gap-10">
            <ClientTab isClient={isClient} />
            {isClient && <ClientCommponent />}
            {!isClient && <ClientPolicyComponent />}
        </div>
    );
}
