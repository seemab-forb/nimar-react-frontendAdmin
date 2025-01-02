import { useInfiniteQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";

import { GetAllAlertsApiResponse } from "./ResponseTypes/useGetAllAlerts.types";
import { getAllAlertsUrl } from "./constants";

const useGetAllAlerts = () => {
  const axiosPrivate = useAxiosPrivate();

  return useInfiniteQuery({
    queryKey: ["getAllAlerts"],
    queryFn: ({
      pageParam = 1,
    }): Promise<{ data: GetAllAlertsApiResponse }> => {
      return axiosPrivate.get(getAllAlertsUrl, {
        params: {
          page: pageParam,
        },
      });
    },
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.data.pagination_data?.current_page;
      const totalPages = lastPage.data.pagination_data?.total_pages;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    // select: (data) => {
    //   GetAllAlertsApiResponseSchema.parse(
    //     data.pages.flatMap((page) => page.data)
    //   );
    //   return data;
    // },
  });
};
export default useGetAllAlerts;
