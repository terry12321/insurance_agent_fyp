import { useRouter } from "next/router";
import { useEffect } from "react";
import { UserStatus } from "../interfaces/UserState";
import { useUserStore } from "../stores/UserStore";
import { BEinstance } from "../utils/axios";

export const useUser = ()=>{
  const Router = useRouter();
  const currentUser = useUserStore((state) => state.user);
  const { userStatus } = currentUser;

  useEffect(()=>{
    const verify = async () =>{
      if (userStatus !== UserStatus.LOGGED_IN) {
        const response = await BEinstance.post("/authentication/verify");
        if (response.status === 200) {
          return;
        } else {
          Router.push('index');
        }
      }
    }
  },[])

}