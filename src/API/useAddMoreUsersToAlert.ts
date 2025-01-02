import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { toast } from "react-toastify";
import { addNewMembersToAlert } from "./constants";
import { useAlertsContext } from "../Components/Alerts/AlertsContext";

export const useAddMoreUsersToAlert = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { clearState } = useAlertsContext();
  return useMutation({
    mutationKey: ["addMoreUsersToAlert"],
    mutationFn: ({
      alertId,
      memberIds,
    }: {
      alertId: number;
      memberIds: string[];
    }) => {
      return axiosPrivate.patch(
        `${addNewMembersToAlert + alertId}/add/member/`,
        {
          data: {
            item_ids: memberIds,
          },
        }
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getSingleAlert"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getAllAlerts"],
      });
      toast.success("New Members Added successfully");
      clearState();
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
};
