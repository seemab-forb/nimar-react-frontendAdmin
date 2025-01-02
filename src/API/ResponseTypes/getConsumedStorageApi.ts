import { z } from "zod";



export const getConsumedStorageApiResponseSchema = z.object({
    data: z.object({
        consumedStorage: z.number(),
    }),
});


export type GetConsumedStorageApiResponseType = z.infer<typeof getConsumedStorageApiResponseSchema>;