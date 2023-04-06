import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export const DocumentPage = () => {
    return (
        <>
            <span className="flex justify-between items-center text-black">
                <span className="text-3xl font-medium w-1/4">Documents</span>
                <div className="flex gap-4 items-center w-2/4">
                    <div className="flex-1 relative">
                        <input
                            placeholder="search"
                            className="pl-4 pr-9 w-full relative rounded-lg outline-none bg-white text-black border-2 border-[#BEBEBE] py-1"
                        />
                        <MagnifyingGlassIcon className="absolute right-2 top-2 h-6 w-6 text-[#7C7C7C]" />
                    </div>
                    <button className="rounded-xl bg-[#424760] px-4 py-2 text-white">Add document</button>
                </div>
            </span>
        </>
    );
};
