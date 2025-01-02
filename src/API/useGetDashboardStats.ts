import { useQuery } from "@tanstack/react-query";
import { getStats } from "./constants";
import axios from "axios";
import { GetDashboardStatsApiResponse } from "./ResponseTypes/getDashboardStats";


function useGetDashboardStats() {
    return useQuery({
        queryKey: ["dashboardStats"],
        queryFn: (): Promise<GetDashboardStatsApiResponse> => {
            return axios.get(getStats);
        },
        refetchInterval: 3000,
        select: (response) => response.data,
    });
}


export default useGetDashboardStats;