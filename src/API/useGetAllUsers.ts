import { useQuery } from "@tanstack/react-query";
import { getAllUsersUrl } from "./constants";
import { useAxiosPrivate } from "./useAxiosPrivate";
import type { GetAllUsersApiResponseType, } from "./ResponseTypes/GetAllUsersApi";

export function useGetAllUsers() {
  const axiosPrivate = useAxiosPrivate();
  return useQuery({
    queryKey: ["getAllUsers"],
    queryFn: (): Promise<GetAllUsersApiResponseType> => {
      return axiosPrivate.get(getAllUsersUrl);
    },
    select: (data) => {



      return data.data;
    },
    refetchInterval: 3000,
  });
}
