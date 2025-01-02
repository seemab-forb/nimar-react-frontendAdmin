import { z } from "zod";



export const SingleUserSchema = z.object({
    UUID: z.number(),
    profilePic: z.string().nullable(),
    username: z.string(),
    userType: z.union([z.literal("admin"), z.literal("user"), z.literal("super")]),
    userGropusCount: z.number(),
    usersCirclesCount: z.number(),
    firstLogin: z.boolean(),
    allocatedStorage: z.number().min(0),
    consumedStorage: z.number().min(0),
    department: z.string(),
    lastLogin: z.string().nullable(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    createdAt: z.string(),
    isActive: z.boolean(),
});

export type SingleUserType = z.infer<typeof SingleUserSchema>;

export const GetAllUsersApiResponseSchema = z.object({
    data: z.array(SingleUserSchema),
});

export type GetAllUsersApiResponseType = z.infer<typeof GetAllUsersApiResponseSchema>;