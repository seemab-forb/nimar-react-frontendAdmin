import { useQuery } from "@tanstack/react-query";
import { useUser } from "../Context/useUser";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { GetAllUsersApiResponseType } from "./ResponseTypes/GetAllUsersApi";
import { topStorageConsumersUrl } from "./constants";
const useTop10StorageConsumers = () => {
  const { userType, userDepartment, } = useUser();
  const axiosPrivate = useAxiosPrivate();


  let departmentId: number | null = null;


  if (userType === "admin") {
    departmentId = userDepartment.departmentId;
  }

  return useQuery({
    queryKey: ["topStorageConsumers"],
    queryFn: async (): Promise<GetAllUsersApiResponseType> => {
      const response = await axiosPrivate.get(
        topStorageConsumersUrl,
        {
          params: {
            departmentId,
          },
        }
      );

      return response;
    },
    select: (data) => data.data,
    refetchInterval: 3000,
  });
};
export default useTop10StorageConsumers;
