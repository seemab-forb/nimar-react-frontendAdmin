import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { deleteUserUrl } from "./constants";

export function useDeleteUser() {
  return useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: (userId: string) => {
      return axios.delete(deleteUserUrl, { data: { uid: userId } });
    },
  });
}
