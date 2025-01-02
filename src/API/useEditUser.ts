import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import type { EditUserType } from "./useEditUser.types";
import { editUserUrl } from "./constants";
import useManageUsersPage, { CreateUserModalModeType } from "../Context/useManageUsersPage";
import { toast } from "react-toastify";



export function useEditUser(id: number | null) {
    const axiosPrivate = useAxiosPrivate();
    const { setCreateUserModalMode, setUsersModalOpen } = useManageUsersPage();

    const queryClient = useQueryClient();

    return useMutation(
        {
            mutationKey: ["editUser", id],
            // TODO: define the type of the mutation parameters
            mutationFn: (userDetails: EditUserType) => {
                return axiosPrivate.patch(`${editUserUrl}${id}/`, userDetails);
            },
            onSuccess: () => {

                setCreateUserModalMode(CreateUserModalModeType.CREATE);
                toast.success("User updated successfully");
                queryClient.removeQueries({
                    queryKey: ["getSingleUser", id],
                });
                queryClient.invalidateQueries({
                    queryKey: ["getAllUsers"],
                });
                queryClient.invalidateQueries({
                    queryKey: ["getConsumedStorage"]
                });
                // no need to remove the query per user id as in edit case, the user id will be null
                setUsersModalOpen(false);
            }

        }

    );
}
