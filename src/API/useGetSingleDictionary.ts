import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { getSingleWordDictionaryUrl } from "./constants";
import { GetSingleDictionaryApiResponse } from "./ResponseTypes/usegetSingleDictinary.type";
export const useGetSingleDictionary = (id: number) => {
  const axiosPrivate = useAxiosPrivate();
  return useQuery({
    queryKey: ["singleDictionary"],
    queryFn: (): Promise<GetSingleDictionaryApiResponse> => {
      return axiosPrivate.get(getSingleWordDictionaryUrl + id);
    },
    select: (data) => data,
    refetchInterval: 3000,
  });
};
