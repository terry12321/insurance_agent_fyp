import { Dialog, Transition } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, Fragment, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CurrencyDollar, X } from "tabler-icons-react";
import {
    ClientPolicyFormProps,
    ClientPolicyProps,
} from "../ClientPolicyComponent";
import { ClientPolicySchema } from "src/schemas/ClientPolicySchema";
import { BEinstance } from "src/utils/axios";

export const ClientUpdatePolicyModal = ({
    isOpen,
    setIsOpen,
    clientId,
    policyDetail,
    handleUpdate,
}: ClientUpdatePolicyModalProps) => {
    const {
        register,
        setValue,
        handleSubmit,
        getValues,
        reset,
        formState: { errors },
    } = useForm<ClientPolicyFormProps>({
        mode: "onBlur",
        defaultValues: {
            name: policyDetail && policyDetail.name,
            premium: policyDetail && policyDetail.premium.toString(),
            coverage: policyDetail && policyDetail.coverage.toString(),
        },
        resolver: yupResolver(ClientPolicySchema),
    });

    const closeModal = () => {
        setIsOpen(false);
        reset();
    };
    const handleOnSubmit = async (data: ClientPolicyFormProps) => {
        // second value is the client id
        if (clientId) {
            const body: ClientPolicyProps = {
                name: data.name,
                clientId: +clientId,
                premium: +data.premium,
                coverage: +data.coverage,
            };
            await BEinstance.put(
                `/client/policy/${policyDetail?.id}`,
                body
            ).then((result) => {
                if (result.data) {
                    handleUpdate();
                    setIsOpen(false);
                    reset();
                }
            });
        }
    };

    useEffect(() => {
        if (policyDetail) {
            setValue("name", policyDetail.name);
            setValue("premium", policyDetail.premium.toString());
            setValue("coverage", policyDetail.coverage.toString());
        }
    }, [policyDetail]);
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-2/4 2xl:w-1/4 2xl:h-fit overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                    <form
                                        onSubmit={handleSubmit((data) =>
                                            handleOnSubmit(data)
                                        )}
                                    >
                                        <div className="flex justify-between">
                                            <span className="font-semibold text-black text-2xl mb-10">
                                                Update Policy
                                            </span>
                                            <X
                                                className="h-6 cursor-pointer text-black"
                                                onClick={() => closeModal()}
                                            />
                                        </div>
                                        <div className="flex flex-col w-full h-full gap-10 text-black">
                                            <div className="flex flex-col">
                                                {errors.name && (
                                                    <div className="text-red-500">
                                                        {errors.name.message}
                                                    </div>
                                                )}
                                                <label>
                                                    Name{" "}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    defaultValue={
                                                        policyDetail?.name
                                                    }
                                                    tabIndex={-1}
                                                    onChange={(e) => {
                                                        setValue(
                                                            "name",
                                                            e.target.value,
                                                            {
                                                                shouldValidate:
                                                                    true,
                                                            }
                                                        );
                                                    }}
                                                    className="bg-white rounded-md border border-[#BEBEBF] outline-none p-2"
                                                />
                                            </div>
                                            <div className="flex flex-col relative">
                                                {errors.premium && (
                                                    <div className="text-red-500">
                                                        {errors.premium.message}
                                                    </div>
                                                )}
                                                <label>
                                                    Premium{" "}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    defaultValue={
                                                        policyDetail?.premium
                                                    }
                                                    tabIndex={-1}
                                                    type="number"
                                                    onChange={(e) => {
                                                        setValue(
                                                            "premium",
                                                            e.target.value,
                                                            {
                                                                shouldValidate:
                                                                    true,
                                                            }
                                                        );
                                                    }}
                                                    autoComplete="off"
                                                    className="bg-white rounded-md border border-[#BEBEBF] outline-none py-2 pl-6 pr-2"
                                                />
                                                <CurrencyDollar
                                                    className="absolute bottom-3 left-1"
                                                    size={20}
                                                />
                                            </div>
                                            <div className="flex flex-col relative">
                                                {errors.coverage && (
                                                    <div className="text-red-500">
                                                        {
                                                            errors.coverage
                                                                .message
                                                        }
                                                    </div>
                                                )}
                                                <label>
                                                    Coverage{" "}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    defaultValue={
                                                        policyDetail?.coverage
                                                    }
                                                    tabIndex={-1}
                                                    type="number"
                                                    autoComplete="off"
                                                    onChange={(e) => {
                                                        setValue(
                                                            "coverage",
                                                            e.target.value,
                                                            {
                                                                shouldValidate:
                                                                    true,
                                                            }
                                                        );
                                                    }}
                                                    className="bg-white rounded-md border border-[#BEBEBF] outline-none py-2 pl-6 pr-2"
                                                />
                                                <CurrencyDollar
                                                    className="absolute bottom-3 left-1"
                                                    size={20}
                                                />
                                            </div>
                                            <div className="flex justify-end">
                                                <button
                                                    type="submit"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-black px-8 py-2 text-sm font-medium text-white disabled:bg-gray-500 disabled:hover:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                >
                                                    Update
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

interface ClientUpdatePolicyModalProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    clientId: string;
    policyDetail: ClientPolicyProps | undefined;
    handleUpdate: () => void;
}
