import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { GetCirclesApiResponse } from "./ResponseTypes/useGetAllCircles.types";
import { getAllCirclesUrl } from "./constants";

const useGetAllCircles = ({ seacrhCircles }: { seacrhCircles: string }) => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["allCircles"],
    queryFn: (): Promise<GetCirclesApiResponse> => {
      return axiosPrivate.get(getAllCirclesUrl, {
        params: {
          query: seacrhCircles,
        },
      });
    },
    select: (data) => data.data,
    refetchInterval: 5000,
  });
};

export default useGetAllCircles;
