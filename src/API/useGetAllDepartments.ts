import { useQuery } from "@tanstack/react-query";
import { departmentsUrl } from "./constants";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { type GetAllDepartmentsType } from "./ResponseTypes/getAllDepartmentsApi";

export const useGetAllDepartments = () => {
  const axiosPrivate = useAxiosPrivate();
  return useQuery({
    queryKey: ["getAllDepartmens"],
    queryFn: (): Promise<GetAllDepartmentsType> => {
      return axiosPrivate.get(departmentsUrl);
    },
    select: (data) => data.data,
    refetchInterval: 3000,

  });
};
