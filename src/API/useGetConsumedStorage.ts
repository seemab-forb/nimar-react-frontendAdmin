import { useQuery } from "@tanstack/react-query";
import { getConsumedStorage } from './constants';
import { GetConsumedStorageApiResponseType, } from './ResponseTypes/getConsumedStorageApi';
import { useAxiosPrivate } from "./useAxiosPrivate";



function useGetConsumedStorage() {
    const axiosPrivate = useAxiosPrivate();
    return useQuery({
        queryKey: ["getConsumedStorage"],
        queryFn: (): Promise<GetConsumedStorageApiResponseType> => {
            return axiosPrivate.get(getConsumedStorage);
        },
        refetchInterval: 20000,
        select: (data) => {
            return data;
        },

    });
}

export default useGetConsumedStorage;


