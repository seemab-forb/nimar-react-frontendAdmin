import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { useAlertsContext } from "../Components/Alerts/AlertsContext";
import { addNewDictionariesToAlert } from "./constants";
import { toast } from "react-toastify";

export const useAddMoreDictionariesToAlert = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { clearState } = useAlertsContext();
  return useMutation({
    mutationKey: ["addMoreDictionariesToAlert"],
    mutationFn: ({
      alertId,
      dictionariesIds,
    }: {
      alertId: number | null;
      dictionariesIds: string[];
    }) => {
      return axiosPrivate.patch(
        `${addNewDictionariesToAlert + alertId}/add/dictionary/`,

        { data: { item_ids: dictionariesIds } }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getSingleAlert"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getAllAlerts"],
      });
      toast.success("New Dictionaries Added successfully");
      clearState();
    },

    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
};
