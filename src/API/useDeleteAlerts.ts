import { useMutation } from "@tanstack/react-query";
import { axiosPrivate, deleteAlertUrl } from "./constants";

export function useDeleteAlerts() {
  return useMutation({
    mutationKey: ["deleteAlerts"],
    mutationFn: (alertsId: number) => {
      return axiosPrivate.delete(deleteAlertUrl + alertsId);
    },
  });
}
