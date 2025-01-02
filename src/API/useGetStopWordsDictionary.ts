import { useQuery } from "@tanstack/react-query";
import { axiosPrivate, getStopWordsDictionaryUrl } from "./constants";
import { GetStopWordsDictionaryApiResponse } from "./ResponseTypes/useGetStopWordsDictionary.types";

export const useGetStopWordsDictionary = () => {
  return useQuery({
    queryKey: ["stopWordsDictionary"],
    queryFn: (): Promise<{ data: GetStopWordsDictionaryApiResponse }> => {
      return axiosPrivate.get(getStopWordsDictionaryUrl);
    },
    select: (data) => data.data,
    refetchInterval: 3000,
  });
};
