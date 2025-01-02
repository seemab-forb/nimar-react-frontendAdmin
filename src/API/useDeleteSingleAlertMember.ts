import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { deletSingleAlertMemberUrl } from "./constants";
import { toast } from "react-toastify";

export const useDeleteSingleAlertMember = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteSingleAlertMember"],
    mutationFn: ({
      alertId,
      memberId,
    }: {
      alertId: number;
      memberId: number;
    }) => {
      return axiosPrivate.delete(
        `${deletSingleAlertMemberUrl + alertId}/remove/member`,
        {
          data: {
            item_ids: [memberId],
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
      toast.success("Member deleted successfully");
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
};
