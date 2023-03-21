import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import AllUser from "src/components/allUser";
import { Oval } from "react-loader-spinner";
import { useUserStore } from "src/stores/UserStore";
import { UserAuthenticate } from "src/interfaces/UserState";

export default function DetailForm() {
    const [name, setName] = useState("Terry Tan");
    const [sex, setSex] = useState("Male");
    const [NRIC, setNRIC] = useState("S9999288C");
    const [address, setAddress] = useState("Blk 100 NTU CRESCENT #10-142");
    const { pathname } = useRouter();
    const [isOpen, setIsOpen] = useState(true);
    const [isChecking, setIsChecking] = useState<boolean>(false);
    const [isOpenCreate, setIsOpenCreate] = useState(false);
    const authenticateDetail = useUserStore(
        (state) => state.authenticateDetail
    );
    const user = useUserStore((state) => state.user);
    const [pass, setPass] = useState("");
    const [createName, setCreateName] = useState("");
    const [createSex, setCreateSex] = useState("");
    const [createNRIC, setCreateNRIC] = useState("");
    const [createAddress, setCreateAddress] = useState("");

    const router = useRouter();
    const { ct } = router.query;

    useEffect(() => {
        if (user.userAuthenticate === UserAuthenticate.AUTHORIZED) {
            setIsOpen(false);
        }
    }, []);

    function closeModal() {
        setIsChecking(true);
        setTimeout(() => {
            setIsChecking(false);
            authenticateDetail();
            setTimeout(() => {
                setIsOpen(false);
            }, 2000);
        }, 5000);
    }

    function externalCloseModal() {
        setIsOpen(false);
        setPass("");
    }

    function externalCloseCreationModal() {
        setIsOpenCreate(false);
        setCreateName("");
        setCreateSex("");
        setCreateNRIC("");
        setCreateAddress("");
    }

    function openModal() {
        setIsOpen(true);
    }
    return (
        <>
            {/** Open Authentication **/}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={externalCloseModal}
                >
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
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-10 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Authentication
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-400">
                                            Key in password to access!
                                        </p>
                                        <input
                                            type={"password"}
                                            onChange={(e) =>
                                                setPass(e.target.value)
                                            }
                                            value={pass}
                                            className="bg-white text-black border-2 w-full rounded-md px-2"
                                        ></input>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="flex items-center justify-center w-fit rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            {isChecking ? (
                                                <Oval
                                                    ariaLabel="toast-loading"
                                                    height={15}
                                                    width={15}
                                                    strokeWidth={6}
                                                    visible
                                                    color="white"
                                                    secondaryColor="white"
                                                />
                                            ) : user.userAuthenticate ===
                                              UserAuthenticate.AUTHORIZED ? (
                                                "Success!"
                                            ) : (
                                                "Authenticate"
                                            )}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/** Open Creation Modal **/}

            <Transition appear show={isOpenCreate} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={externalCloseCreationModal}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-1/2 transform overflow-hidden rounded-2xl bg-white p-10 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Create Client Portfolio
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <span className="text-sm text-gray-400">
                                            Name
                                        </span>
                                        <input
                                            onChange={(e) =>
                                                setCreateName(e.target.value)
                                            }
                                            value={createName}
                                            className="bg-white text-black border-2 w-full rounded-md px-2"
                                        ></input>
                                        <span className="text-sm text-gray-400">
                                            Sex
                                        </span>
                                        <input
                                            onChange={(e) =>
                                                setCreateSex(e.target.value)
                                            }
                                            value={createSex}
                                            className="bg-white text-black border-2 w-full rounded-md px-2"
                                        ></input>
                                        <span className="text-sm text-gray-400">
                                            NRIC
                                        </span>
                                        <input
                                            onChange={(e) =>
                                                setCreateNRIC(e.target.value)
                                            }
                                            value={createNRIC}
                                            className="bg-white text-black border-2 w-full rounded-md px-2"
                                        ></input>
                                        <span className="text-sm text-gray-400">
                                            Address
                                        </span>
                                        <input
                                            onChange={(e) =>
                                                setCreateAddress(e.target.value)
                                            }
                                            value={createAddress}
                                            className="bg-white text-black border-2 w-full rounded-md px-2"
                                        ></input>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="flex items-center justify-center w-fit rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            add
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            {user.userAuthenticate === UserAuthenticate.AUTHORIZED &&
            !isOpen ? (
                <div className="h-5/6 w-5/6 p-20 rounded-[24px] flex flex-col items-center justify-center bg-white text-black">
                    <div className="w-full flex">
                        <button
                            className="bg-cyan-500 text-white rounded-md px-2"
                            onClick={() => setIsOpenCreate(true)}
                        >
                            Add Client Details
                        </button>
                    </div>
                    <div className="flex w-full h-full">
                        {ct ? (
                            <div className="flex flex-col gap-10 w-full h-full justify-center">
                                <div>
                                    <label className="text-gray-500 pl-2">
                                        Name
                                    </label>
                                    <input
                                        className="w-full px-2 bg-white border-2 py-2 rounded-lg"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-500 pl-2">
                                        Sex
                                    </label>
                                    <input
                                        className="w-full px-2 bg-white border-2 py-2 rounded-lg"
                                        value={sex}
                                        onChange={(e) => setSex(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-500 pl-2">
                                        NRIC
                                    </label>
                                    <input
                                        className="w-full px-2 bg-white border-2 py-2 rounded-lg"
                                        value={NRIC}
                                        onChange={(e) =>
                                            setNRIC(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-500 pl-2">
                                        Address
                                    </label>
                                    <input
                                        className="w-full px-2 bg-white border-2 py-2 rounded-lg"
                                        value={address}
                                        onChange={(e) =>
                                            setAddress(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        ) : (
                            <AllUser path={pathname} />
                        )}
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
