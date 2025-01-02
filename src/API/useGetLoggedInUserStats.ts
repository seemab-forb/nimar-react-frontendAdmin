import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { getloggedInUserStatsUrl } from "./constants";
import { useUser } from "../Context/useUser";



type LoggedInUserStatsApiResponse = {
    dates: Array<string>;
    counts: Array<number>;
};



export const useGetLoggedInUserStats = () => {
    const { userType, userDepartment } = useUser();
    const axiosInstance = useAxiosPrivate();


    let departmentId: null | number = null;


    if (userType === "admin") {
        departmentId = userDepartment.departmentId;
    }

    return useQuery({
        queryKey: ['getloggedInUserStats'],
        queryFn: async (): Promise<LoggedInUserStatsApiResponse> => {
            const response = await axiosInstance.get(getloggedInUserStatsUrl, {
                params: {
                    departmentId,
                },

            });
            return response.data;
        },
        refetchInterval: 3000,
    });
};
