import { useUserStore } from "../stores/UserStore";

export default function About() {
    const { userStatus } = useUserStore((state) => state.user);
    console.log(userStatus);
    // const authenticated = verifyJWTToken();
    // console.log(authenticated);
    return <div>cao ni mei</div>;
}
