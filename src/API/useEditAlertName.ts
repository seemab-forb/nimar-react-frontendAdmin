import { useMutation } from "@tanstack/react-query";
import { axiosPrivate, editAlertNameUrl } from "./constants";

export function useEditAlertName() {
  return useMutation({
    mutationKey: ["editDictionaryName"],
    mutationFn: (data: { alertname: string; id: number }) => {
      return axiosPrivate.patch(`${editAlertNameUrl}${data.id}/`, {
        alertName: data.alertname,
      });
    },
  });
}
