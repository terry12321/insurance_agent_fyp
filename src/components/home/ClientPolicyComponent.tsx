import { useCallback, useEffect, useState } from "react";
import { ClientPolicyModal } from "./clientPolicy/ClientPolicyModal";
import { BEinstance } from "src/utils/axios";
import { useRouter } from "next/router";
import { ClientUpdatePolicyModal } from "./clientPolicy/UpdateClientPolicyModal";

export default function ClientPolicyComponent() {
    const headers = ["Name", "Premium", "Coverage", " "];
    const [isOpen, setIsOpen] = useState(false);
    const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
    const [clientId, setClientId] = useState("");
    const [policyDetail, setPolicyDetail] = useState<
        ClientPolicyProps | undefined
    >(undefined);
    const [clientPolicyDetails, setClientPolicyDetails] = useState<
        ClientPolicyProps[] | null
    >(null);
    const router = useRouter();
    const getClientPolicyDetails = useCallback(async (clientId: string) => {
        await BEinstance.get(`/client/policy/${clientId}`).then((result) => {
            if (result.data) {
                setClientPolicyDetails(result.data);
            }
        });
    }, []);

    const handleUpdate = () => {
        getClientPolicyDetails(clientId);
    };

    /** USEEFFECT **/
    useEffect(() => {
        if (router.query.client) {
            const id = router.query.client[1];
            setClientId(id);
            getClientPolicyDetails(id);
        }
    }, []);
    return (
        <div className="text-black flex flex-col gap-8">
            {/** HEADER PORTION **/}
            <div className="flex items-center justify-between">
                <span className="text-4xl font-medium">Client Policies</span>
                <button
                    className="rounded-xl bg-[#424760] text-white px-4 py-2"
                    onClick={() => setIsOpen(true)}
                >
                    Add Policy
                </button>
            </div>
            {clientPolicyDetails && clientPolicyDetails.length > 0 && (
                <table className="text-black w-full text-left table-auto border-separate border-spacing-y-4">
                    <thead>
                        <tr className="py-4">
                            {headers.map((header, idx) => {
                                return (
                                    <th
                                        key={idx}
                                        className="text-black text-left pl-4"
                                    >
                                        {header}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {clientPolicyDetails.map((policy, idx) => {
                            return (
                                <tr
                                    className="bg-[#EDEFF5] h-10 mb-10"
                                    key={idx}
                                >
                                    <td className="text-black text-left pl-4">
                                        {policy.name}
                                    </td>
                                    <td className="text-black text-left pl-4">
                                        ${policy.premium.toLocaleString()}
                                    </td>
                                    <td className="text-black text-left pl-4">
                                        ${policy.coverage.toLocaleString()}
                                    </td>
                                    <td className="text-[#817D7D]  text-right pr-4">
                                        <span
                                            className=" cursor-pointer hover:text-blue-500"
                                            onClick={() => {
                                                setPolicyDetail(policy);
                                                setIsPolicyModalOpen(true);
                                            }}
                                        >
                                            Edit
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}

            <ClientPolicyModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                clientId={clientId}
                handleUpdate={handleUpdate}
            />

            <ClientUpdatePolicyModal
                isOpen={isPolicyModalOpen}
                setIsOpen={setIsPolicyModalOpen}
                clientId={clientId}
                policyDetail={policyDetail}
                handleUpdate={handleUpdate}
            />
        </div>
    );
}

export interface ClientPolicyFormProps {
    name: string;
    premium: string;
    coverage: string;
    clientId: string;
}

export interface ClientPolicyProps {
    id?: number;
    name: string;
    premium: number;
    coverage: number;
    clientId: number;
}
