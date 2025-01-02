import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { getSingleAlertsType } from "./ResponseTypes/useGetSingleAlert.types";
import { getSingleAlert } from "./constants";

export const useGetSingleAlert = (id: number) => {
  const axiosPrivate = useAxiosPrivate();
  return useQuery({
    queryKey: ["getSingleAlert", id],
    queryFn: () => {
      return axiosPrivate.get<getSingleAlertsType>(getSingleAlert + id);
    },
    select: (data) => data.data,
  });
};
