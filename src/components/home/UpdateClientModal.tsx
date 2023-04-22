import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { Occupation } from "./interface/ClientInterface";
import { Dialog, Transition } from "@headlessui/react";
import { Select } from "antd";
import { ClientFormProps } from "./AddClientModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ClientSchema } from "src/schemas/ClientSchema";
import { X } from "tabler-icons-react";
import { BEinstance } from "src/utils/axios";

const Option = Select.Option;

export const UpdateClientModal = ({
    isOpen,
    setIsOpen,
    occupation,
    clientDetails,
    id,
    handleUpdate,
    getClientDetails,
}: UpdateClientModalProps) => {
    const {
        register,
        setValue,
        handleSubmit,
        getValues,
        reset,
        formState: { errors },
    } = useForm<ClientFormProps>({
        mode: "onBlur",
        defaultValues: clientDetails,
        resolver: yupResolver(ClientSchema),
    });

    async function closeModal() {
        setIsOpen(false);
        getClientDetails();
        await BEinstance.get(`/client/${id}`).then((result) => {
            if (result.data) {
                reset(result.data);
            }
        });
    }

    const handleOnSubmit = async (data: ClientFormProps) => {
        await BEinstance.put(`/client/${id}`, data).then((result) => {
            if (result.data) {
                handleUpdate();
                setIsOpen(false);
            }
        });
    };

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
                                            <span className="font-semibold text-black text-2xl mb-4">
                                                Update Client
                                            </span>
                                            <X
                                                className="h-6 cursor-pointer text-black"
                                                onClick={() => setIsOpen(false)}
                                            />
                                        </div>
                                        <div className="flex flex-col w-full h-full gap-4 text-black">
                                            <div className="flex flex-col">
                                                {errors.name && (
                                                    <div className="text-red-500">
                                                        {errors.name.message}
                                                    </div>
                                                )}
                                                <label className="text-xl">
                                                    Name{" "}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    {...register("name")}
                                                    onChange={(e) =>
                                                        setValue(
                                                            "name",
                                                            e.target.value,
                                                            {
                                                                shouldValidate:
                                                                    true,
                                                            }
                                                        )
                                                    }
                                                    className="bg-white rounded-md border border-[#BEBEBF] outline-none p-2"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                {errors.NRIC && (
                                                    <div className="text-red-500">
                                                        {errors.NRIC.message}
                                                    </div>
                                                )}
                                                <label className="text-xl">
                                                    NRIC{" "}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    {...register("NRIC")}
                                                    onChange={(e) => {
                                                        setValue(
                                                            "NRIC",
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
                                            <div className="flex flex-col">
                                                {errors.contactNo && (
                                                    <div className="text-red-500">
                                                        {
                                                            errors.contactNo
                                                                .message
                                                        }
                                                    </div>
                                                )}
                                                <label className="text-xl">
                                                    Contact Number{" "}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    {...register("contactNo")}
                                                    onChange={(e) => {
                                                        setValue(
                                                            "contactNo",
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
                                            <div className="flex flex-col">
                                                {errors.email && (
                                                    <div className="text-red-500">
                                                        {errors.email.message}
                                                    </div>
                                                )}
                                                <label className="text-xl">
                                                    Email
                                                </label>
                                                <input
                                                    {...register("email")}
                                                    onChange={(e) => {
                                                        setValue(
                                                            "email",
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
                                            <div className="flex flex-col">
                                                {errors.address && (
                                                    <div className="text-red-500">
                                                        {errors.address.message}
                                                    </div>
                                                )}
                                                <label className="text-xl">
                                                    Address{" "}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    {...register("address")}
                                                    onChange={(e) => {
                                                        setValue(
                                                            "address",
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
                                            <div className="flex flex-col">
                                                <label className="text-xl">
                                                    Occupation{" "}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                <Select
                                                    showSearch
                                                    style={{ width: 200 }}
                                                    placeholder="Select a person"
                                                    optionFilterProp="children"
                                                    defaultValue={getValues(
                                                        "occupation"
                                                    )}
                                                    onChange={(value) => {
                                                        setValue(
                                                            "occupation",
                                                            value,
                                                            {
                                                                shouldValidate:
                                                                    true,
                                                            }
                                                        );
                                                    }}
                                                    filterOption={(
                                                        input,
                                                        option
                                                    ) => {
                                                        if (option) {
                                                            return (
                                                                option.props.children
                                                                    .toLowerCase()
                                                                    .indexOf(
                                                                        input.toLowerCase()
                                                                    ) >= 0
                                                            );
                                                        } else {
                                                            return false;
                                                        }
                                                    }}
                                                >
                                                    {occupation.length > 0 &&
                                                        occupation.map(
                                                            (
                                                                eachOccupation
                                                            ) => {
                                                                return (
                                                                    <Option
                                                                        key={
                                                                            eachOccupation.id
                                                                        }
                                                                        value={
                                                                            eachOccupation.occupation
                                                                        }
                                                                    >
                                                                        {
                                                                            eachOccupation.occupation
                                                                        }
                                                                    </Option>
                                                                );
                                                            }
                                                        )}
                                                </Select>
                                            </div>
                                            <div className="flex justify-end">
                                                <button
                                                    type="submit"
                                                    // disabled={!isValid}
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-black px-8 py-2 text-sm font-medium text-white disabled:bg-gray-500 disabled:hover:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                >
                                                    Add Task
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

interface UpdateClientModalProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    occupation: Array<Occupation>;
    clientDetails: ClientFormProps;
    id: string;
    handleUpdate: () => void;
    getClientDetails: () => Promise<void>;
}
