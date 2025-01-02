import { useQuery } from "@tanstack/react-query";
import { SingleUserType } from "./ResponseTypes/GetAllUsersApi";
import { useUser } from "../Context/useUser";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { topActiveUsersUrl } from "./constants";


type TopActiveConsumersReponseType = {
  data: Array<SingleUserType & { noOfPosts: number; }>;
};

const useTopActiveConsumers = () => {
  const { userType, userDepartment } = useUser();
  const axiosPrivate = useAxiosPrivate();


  let departmentId: null | number = null;


  if (userType === "admin") {
    departmentId = userDepartment.departmentId;
  }


  return useQuery({
    queryKey: ["activeUsers"],
    queryFn: async (): Promise<TopActiveConsumersReponseType> => {
      const response = await axiosPrivate.get(
        topActiveUsersUrl,
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
export default useTopActiveConsumers;
