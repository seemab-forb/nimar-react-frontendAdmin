import axios from "axios";
import { refreshUrl } from "./constants";
import { useUser } from "../Context/useUser";
import type { UserDetailType } from "./ResponseTypes/useLoginUser.types";


export type temporaryUserLoginResponseType = {
    data: {
        results: UserDetailType;
    };
};



export const useRefreshToken = () => {
    const { refreshToken } = useUser();
    async function refresh() {
        const newToken: temporaryUserLoginResponseType = await axios.post(
            refreshUrl,
            {
                refreshToken: refreshToken || "",
            },
            {
                withCredentials: true,
            }
        );
        return newToken;
    }

    return refresh;
};
