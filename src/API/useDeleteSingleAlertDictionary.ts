import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { toast } from "react-toastify";
import { deleteSingleAlertDictionaryUrl } from "./constants";

export const useDeleteSingleAlertDictionary = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteSingleAlertDictionary"],
    mutationFn: ({
      alertId,
      dictionaryId,
    }: {
      alertId: number;
      dictionaryId: number;
    }) => {
      return axiosPrivate.delete(
        `${deleteSingleAlertDictionaryUrl + alertId}/remove/dictionary`,
        {
          data: {
            item_ids: [dictionaryId],
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
      toast.success("Dictionary deleted successfully");
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
};
