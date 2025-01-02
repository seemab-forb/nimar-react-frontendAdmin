import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { getSingleUserUrl } from "./constants";
import { CreateUserModalModeType } from "../Context/useManageUsersPage";
import type { SingleUserApiResponseType } from "./ResponseTypes/GetSingleUserApi";

function useGetSingleUser({
	id,
	mode,
}: {
	id: number | null;
	mode: CreateUserModalModeType;
}) {
	const axiosInstance = useAxiosPrivate();
	return useQuery({
		queryKey: ["singleUser", id],
		queryFn: (): Promise<SingleUserApiResponseType> => {
			return axiosInstance.get(`${getSingleUserUrl}${id}/`);
		},
		// TODO: this logic must be shifted to the calling component. so that we can use this hook in any component and just pass a boolean to enable/disable the call
		enabled: mode === CreateUserModalModeType.EDIT && id !== null,

		select: (data) => {
			return data.data;
		},
	});
}

export default useGetSingleUser;
