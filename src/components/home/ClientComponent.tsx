import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { BEinstance } from "src/utils/axios";
import { ClientFormProps } from "./AddClientModal";
import { Occupation } from "./interface/ClientInterface";
import { UpdateClientModal } from "./UpdateClientModal";
import { getOccuption } from "src/pages/home";

export default function ClientCommponent() {
    const [clientDetails, setClientDetails] = useState<ClientFormProps | null>(
        null
    );
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [occupation, setOccupation] = useState<Array<Occupation>>([]);
    const router = useRouter();
    const splitPath = router.asPath.split("/");
    const id = splitPath[splitPath.length - 1];
    const getClientDetails = useCallback(async () => {
        await BEinstance.get(`/client/${id}`).then((result) => {
            if (result.data) {
                setClientDetails(result.data);
            }
        });
    }, []);

    const handleUpdate = () => {
        getClientDetails();
        getOccuption(setOccupation);
    };

    /** UseEffect **/
    useEffect(() => {
        getClientDetails();
        getOccuption(setOccupation);
    }, []);
    
    if (clientDetails !== null) {
        return (
            <>
                <div className="flex justify-between text-black">
                    <span className="text-4xl font-medium">Client Details</span>
                    <button
                        onClick={() => setIsOpenModal(true)}
                        className="px-10 py-2 rounded-xl bg-[#424760] text-white"
                    >
                        Edit
                    </button>
                </div>
                <div className="flex items-center justify-between text-black w-3/4 mx-auto px-10 mt-10">
                    <div className="flex flex-col gap-4 items-center">
                        <img
                            width={200}
                            height={200}
                            className="rounded-full"
                            src={
                                clientDetails.profileImage === ""
                                    ? "/images/default-profile.png"
                                    : clientDetails.profileImage
                            }
                        />
                        <span className="text-2xl">{clientDetails.name}</span>
                    </div>
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col">
                            <span className="font-medium">NRIC: </span>
                            <span className="font-light">
                                {clientDetails.NRIC}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium">
                                Contact number:{" "}
                            </span>
                            <span className="font-light">
                                {clientDetails.contactNo}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium">Email: </span>
                            <span className="font-light">
                                {clientDetails.email}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium">Address: </span>
                            <span className="font-light">
                                {clientDetails.address}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium">Occupation: </span>
                            <span className="font-light">
                                {clientDetails.occupation}
                            </span>
                        </div>
                    </div>
                </div>
                {clientDetails ? (
                    <UpdateClientModal
                        setIsOpen={setIsOpenModal}
                        isOpen={isOpenModal}
                        occupation={occupation}
                        clientDetails={clientDetails}
                        id={id}
                        handleUpdate={handleUpdate}
                        getClientDetails={getClientDetails}
                    />
                ) : (
                    <></>
                )}
            </>
        );
    } else {
        return <></>;
    }
}
