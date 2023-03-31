import create from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
    UserAuthenticate,
    UserState,
    UserStatus,
} from "../interfaces/UserState";
import { BEinstance } from "../utils/axios";

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: {
                userStatus: UserStatus.LOGGED_OUT,
                userAuthenticate: UserAuthenticate.UNAUTHORIZED,
            },
            login: async (email: string, password: string) => {
                return await BEinstance.post("/authentication/login", {
                    email: email,
                    password: password,
                })
                    .then((response) => {
                        if (response) {
                            set(() => ({
                                user: {
                                    userStatus: UserStatus.LOGGED_IN,
                                    userAuthenticate:
                                        UserAuthenticate.UNAUTHORIZED,
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
                                    userAuthenticate:
                                        UserAuthenticate.UNAUTHORIZED,
                                },
                            }));
                            return response;
                        }
                    })
                    .catch((error) => {
                        return error;
                    });
            },
            authenticateDetail: () =>
                set(() => ({
                    user: {
                        userStatus: UserStatus.LOGGED_IN,
                        userAuthenticate: UserAuthenticate.AUTHORIZED,
                    },
                })),
        }),
        { name: "userStorage", storage: createJSONStorage(() => localStorage) }
    )
);
