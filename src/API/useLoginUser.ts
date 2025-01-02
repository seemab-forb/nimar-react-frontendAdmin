import { useMutation } from "@tanstack/react-query";
import { loginUrl } from "./constants";
import axios from "axios";
import { LoginUserAPIResponseSchema, type LoginUserAPIResponseType, } from "./ResponseTypes/useLoginUser.types";

function useLoginUser() {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (loginDetails: { name: string; password: string; }): Promise<LoginUserAPIResponseType> => {
      return axios.post(loginUrl, { ...loginDetails, portal: "admin" }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    },
    onSuccess(data) {
      console.log(LoginUserAPIResponseSchema.safeParse(data));
    },

  });
}
export default useLoginUser;
