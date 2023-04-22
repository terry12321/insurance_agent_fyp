import { useRouter } from "next/router";

export default function BulletinTab() {
    const router = useRouter();
    return (
        <div className="flex gap-16 justify-end w-full text-black pl-4 py-4">
            <a
                className={`${
                    router.asPath === "/bulletin"
                        ? "border-b-2 border-black"
                        : ""
                }`}
                href="/bulletin"
            >
                Task
            </a>
            <a
                className={`${
                    router.asPath === "/bulletin/document"
                        ? "border-b-2 border-black"
                        : ""
                }`}
                href="/bulletin/document"
            >
                Documents
            </a>
        </div>
    );
}
