import { z } from "zod";

export const UserCircleSchema = z.object({
  id: z.number(),
  name: z.string(),
  created_by: z.number(),
  is_active: z.boolean(),
  is_department_public: z.boolean(),
});


export type UserCirclesType = z.infer<typeof UserCircleSchema>;


export const UserDetailSchema = z.object({
  userType: z.union(
    [z.literal("admin"), z.literal("user"), z.literal("super")]
  ).nullable(),
  profilePic: z.string().nullable(),
  firstLogin: z.boolean(),
  UUID: z.number(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
  lastLogin: z.string(),
  consumedStorage: z.number(),
  allocatedStorage: z.number(),
  // TODO: userPermissions type to be decided
  userPermissions: z.array(z.number()),
  // TODO: userGroups type to be decided
  userGroups: z.array(z.string()),
  userDepartment: z.object({
    logo: z.string(),
    departmentName: z.string(),
    departmentId: z.number(),
    departmentAbbreviation: z.string(),
  }),
  // N
  userCircles: z.array(UserCircleSchema),
  postsCount: z.number(),
}).strict();


export type UserDetailType = z.infer<typeof UserDetailSchema>;


export const LoginUserAPIResponseSchema = z.object({
  data: z.object({
    results: UserDetailSchema,
    message: z.string(),
  }),
});

export type LoginUserAPIResponseType = z.infer<typeof LoginUserAPIResponseSchema>;

