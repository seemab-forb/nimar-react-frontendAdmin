import { z } from "zod";

export const CircleDepartmentsDataTypeSchema = z.object({
  name: z.string(),
  usersCount: z.number(),
  departmentAbbreviation: z.string(),
});

export type CircleDepartmentsDataType = z.infer<
  typeof CircleDepartmentsDataTypeSchema
>;

export const CircleOwnerDataTypeSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    profilePic: z.string(),
    department: z.string(),
    departmentId: z.number(),
    departmentAbbreviation: z.string(),
  })
  .strict();

export type CircleOwnerDataType = z.infer<typeof CircleOwnerDataTypeSchema>;

export const CircleMembersDataTypeSchema = CircleOwnerDataTypeSchema.extend({
  isAdmin: z.boolean(),
  isContributor: z.boolean(),
});

export type CircleMembersDataType = z.infer<typeof CircleMembersDataTypeSchema>;

export const CircleDataTypeSchema = z.object({
  id: z.number().nullable(),
  circleName: z.string(),
  circleOwner: CircleOwnerDataTypeSchema,
  circleContributers: z.array(CircleMembersDataTypeSchema),
  circleAdmins: z.array(CircleMembersDataTypeSchema),
  circleMembers: z.array(CircleMembersDataTypeSchema),
  circleDepartments: z.array(CircleDepartmentsDataTypeSchema),
  circleAdminsCount: z.number(),
  circleContributersCount: z.number(),
  circleMembersCount: z.number(),
  circleDepartmentsCount: z.number(),
  visibility: z.union([z.literal("private"), z.literal("public")]),
  is_active: z.boolean(),
  is_department_public: z.boolean(),
  is_user_private: z.boolean(),
  isAdmin: z.boolean(),
  isContributor: z.boolean(),
  isMember: z.boolean(),
  isEditable: z.boolean(),
});

export type CircleDataType = z.infer<typeof CircleDataTypeSchema>;

export const GetCirclesApiResponseSchema = z.object({
  data: z.array(CircleDataTypeSchema),
});

export type GetCirclesApiResponse = z.infer<typeof GetCirclesApiResponseSchema>;
