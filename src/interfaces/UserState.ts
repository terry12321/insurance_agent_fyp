import { AxiosResponse } from "axios";

/**
 * @enum {number}
 */
export enum UserStatus {
    LOGGED_IN, // Verified with Auth Server
    LOGGED_OUT, // No cookies is found
    UNAUTHORIZED, // Verified with Auth Server but ???
}

export enum UserAuthenticate {
    AUTHORIZED,
    UNAUTHORIZED
}

interface User {
    userStatus: UserStatus;
    userAuthenticate: UserAuthenticate;
}

export interface UserState {
    user: User;
    login: (username: string, password: string) => Promise<AxiosResponse>;
    logout: () => Promise<AxiosResponse>;
    authenticateDetail: () => void;
}
