import { AxiosResponse } from "axios";

/**
 * @enum {number}
 */
export enum UserStatus {
    LOGGED_IN, // Verified with Auth Server
    LOGGED_OUT, // No cookies is found
    UNAUTHORIZED, // Verified with Auth Server but ???
}

interface User {
    userStatus: UserStatus;
}

export interface UserState {
    user: User;
    login: (username: string, password: string) => Promise<AxiosResponse>;
    logout: () => Promise<AxiosResponse>;
}
