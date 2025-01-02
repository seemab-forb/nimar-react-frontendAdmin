import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { checkUsernameUrl } from "./constants";
import { z } from 'zod';



export const useCheckUserName = (username: string) => {
    const axiosPrivate = useAxiosPrivate();

    return useQuery({
        queryKey: ["usernameValidation", username],
        queryFn: (): Promise<{ data: { message: string; }; }> => {
            return axiosPrivate.get(`${checkUsernameUrl}`, {
                params: {
                    userName: username,
                },
            });

        },
        enabled: !!username,
        retry: false,
        select: (data) => {

            return data;

        },
    });
};


export const CheckUserNameApiResponseSchema = z.object({
    data: z.object({
        message: z.number(),
    }),
})

