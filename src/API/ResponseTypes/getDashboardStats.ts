import { z } from "zod";

const getDashboardStatsSchema = z.object({
    mediaTypeCounts: z.object({
        videosCount: z.number(),
        imagesCount: z.number(),
        audiosCount: z.number(),
        othersCount: z.number(),
    }),
    departmentStorageStats: z.array(z.object({
        departmentName: z.string(),
        totalStorage: z.number(),
        usedStorage: z.number(),
    })),
});


export type GetDashboardStats = z.infer<typeof getDashboardStatsSchema>;



export const getDashboardStatsApiSchema = z.object({
    data: getDashboardStatsSchema,
});

export type GetDashboardStatsApiResponse = z.infer<typeof getDashboardStatsApiSchema>;