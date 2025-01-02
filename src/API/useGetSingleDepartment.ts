import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { departmentsUrl } from "./constants";
import { DepartmentModalModeType } from "../Context/useManageDepartmentsPage.types";
import { GetSingleDepartmentApiType } from './ResponseTypes/getSingleDepartmentApi';


export const useGetSingleDepartment = ({ id, mode }: {
    id: number | null;
    mode: DepartmentModalModeType;
}) => {
    const axiosInstance = useAxiosPrivate();
    return useQuery({
        queryKey: ["getSingleDepartment", id],
        queryFn: (): Promise<GetSingleDepartmentApiType> => {
            return axiosInstance.get(`${departmentsUrl}${id}`);
        },
        enabled: !!id || mode === DepartmentModalModeType.Edit,
        select: (response) => response.data,



    });
};

