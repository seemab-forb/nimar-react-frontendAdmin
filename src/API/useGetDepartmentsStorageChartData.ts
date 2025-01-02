import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { getDepartmentStorageGraphData } from "./constants";



type GetDepartmentStorageGraphDataResponseType = {

    departmentAbbreviation: Array<string>;
    allocatedSpace: Array<number>;
    userAllocatedSpace: Array<number>;
    userConsumedSpace: Array<number>;


};

// TODO: define the response types of all api calls in respective folder
export function useGetDepartmentsStorageChartData() {
    const axiosPrivate = useAxiosPrivate();
    return useQuery({
        queryKey: ["departmentStorageGraphData"],
        queryFn: async (): Promise<GetDepartmentStorageGraphDataResponseType> => {
            const response = await axiosPrivate.get(getDepartmentStorageGraphData);
            return response.data;
        },
        refetchInterval: 3000,

    });
}