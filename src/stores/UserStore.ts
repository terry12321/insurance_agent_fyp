import create from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
    UserAuthenticate,
    UserState,
    UserStatus,
} from "../interfaces/UserState";
import { BEinstance } from "../utils/axios";
import { UserProfile } from "src/interfaces/UserProfile";

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
                                    userProfile: response.data.user,
                                },
                            }));
                            return response;
                        }
                    })
                    .catch((error) => {
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
                                    userProfile: undefined,
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
            setUserProfile: (userProfile: UserProfile) =>
                set(() => ({
                    user: {
                        userStatus: UserStatus.LOGGED_IN,
                        userAuthenticate: UserAuthenticate.AUTHORIZED,
                        userProfile: userProfile,
                    },
                })),
        }),
        { name: "userStorage", storage: createJSONStorage(() => localStorage) }
    )
);
