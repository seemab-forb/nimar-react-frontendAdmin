import { useQuery } from "@tanstack/react-query";
import { axiosPrivate, getServicesStatusUrl } from "./constants";
import { ServiceStatusApiResponseType } from "./ResponseTypes/useGetServicesStatus.types";

export const useGetServicesStatus = () => {
  return useQuery({
    queryKey: ["servicesStatus"],
    queryFn: (): Promise<{ data: ServiceStatusApiResponseType }> => {
      return axiosPrivate.get(`${getServicesStatusUrl}`);
    },
    select: (data) => {
      return data.data;
    },
  });
};
