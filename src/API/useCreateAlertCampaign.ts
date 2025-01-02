import { toast } from "react-toastify";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAlertsContext } from "../Components/Alerts/AlertsContext";
import { createAlertsUrl } from "./constants";

export interface addAlertType {
  alertSource: string;

  circle: number | null | undefined;
  alertDictionaries: string[];
  members: string[];
}

export const useCreateAlertCampaign = () => {
  const { clearState, alertName } = useAlertsContext();
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createAlert"],
    mutationFn: (data: addAlertType) => {
      return axiosPrivate.post(createAlertsUrl, {
        alertSource: data.alertSource,
        alertName: alertName,
        circle: data.circle,
        alertDictionaries: data.alertDictionaries,
        members: data.members,
      });
    },
    onSuccess() {
      toast.success("Alert Compaign created successfully");
      clearState();
      queryClient.invalidateQueries({ queryKey: ["getAllAlerts"] });
    },
    onError(error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
};
