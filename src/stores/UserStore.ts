import create from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { UserState, UserStatus } from "../interfaces/UserState";
import { BEinstance } from "../utils/axios";

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: {
                userStatus: UserStatus.LOGGED_OUT,
            },
            login: async (username: string, password: string) => {
                return await BEinstance.post("/authentication/login", {
                    username: username,
                    password: password,
                })
                    .then((response) => {
                        if (response) {
                            set(() => ({
                                user: {
                                    userStatus: UserStatus.LOGGED_IN,
                                },
                            }));
                            return response;
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        return error;
                    });
            },
            logout: async () => {
                return await BEinstance.post("/authentication/logout")
                    .then((response) => {
                        if (response) {
                            set(() => ({
                                user: {
                                    userStatus: UserStatus.LOGGED_OUT,
                                },
                            }));
                            return response;
                        }
                    })
                    .catch((error) => {
                        return error;
                    });
            },
        }),
        { name: "userStorage", storage: createJSONStorage(() => localStorage) }
    )
);
