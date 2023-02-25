import create from "zustand";
import { UserState, UserStatus } from "../interfaces/UserState";
import { BEinstance, FEinstance } from "../utils/axios";

export const useUserStore = create<UserState>((set) => ({
    user: {
        userStatus: UserStatus.LOGGED_OUT,
    },
    login: async (username:string,password:string) => {
        const response: boolean | undefined = await FEinstance.post("/api/auth", {
            username: username,
            password: password,
        });
        if (response) {
          set(() => ({
            user: {
              userStatus: UserStatus.LOGGED_IN,
            },
          }));
        } else {
          set(() => ({
            user: {
              userStatus: UserStatus.UNAUTHORIZED,
            },
          }));
        }
    
        return response;
      },
      logout : async() =>{
        const response = await BEinstance.post("/authentication/logout");
        if(response.status === 200){
          set(()=>({
            user:{
              userStatus: UserStatus.LOGGED_OUT
            }
          }));
        }
      }
}));
