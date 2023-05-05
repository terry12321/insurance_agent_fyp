import { AxiosResponse } from "axios";
import { UserProfile } from "./UserProfile";

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
    UNAUTHORIZED,
}

interface User {
    userStatus: UserStatus;
    userAuthenticate: UserAuthenticate;
    userProfile?: UserProfile;
}

export interface UserState {
    user: User;
    login: (email: string, password: string) => Promise<AxiosResponse>;
    logout: () => Promise<AxiosResponse>;
    authenticateDetail: () => void;
    setUserProfile: (userProfile: UserProfile) => void;
}
