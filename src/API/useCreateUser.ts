import { createUserUrl } from "./constants";
import { useMutation } from "@tanstack/react-query";
import type { UserDetail } from "./useCreateUser.types";
import { useAxiosPrivate } from "./useAxiosPrivate";

export function useCreateUser() {
  const axiosPrivate = useAxiosPrivate();
  return useMutation({
    mutationKey: ["createUser"],
    mutationFn: (userDetails: UserDetail) => {
      return axiosPrivate.post(createUserUrl, userDetails);
    },
  });
}
