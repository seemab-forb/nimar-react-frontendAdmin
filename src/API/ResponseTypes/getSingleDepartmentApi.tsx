import { z } from "zod";

export const SingleDepartmentSchema = z
  .object({
    id: z.number(),
    departmentUserName: z.string(),
    departmentEmail: z.string().email(),
    adminFirstName: z.string(),
    adminLastName: z.string(),
    departmentLogo: z.string(),
    departmentPermissions: z.array(z.string()),
    departmentUsersCount: z.number(),
    departmentGroupsCount: z.number(),
    departmentCriclesCount: z.number(),
    departmentName: z.string(),
    departmentAbbreviation: z.string(),
    allocatedSpace: z.number(),
    consumedSpace: z.number(),
    usersConsumedStorage: z.number(),
    created_at: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{6}\+\d{2}:\d{2}$/),
  })
  .strict();

export type SingleDepartmentType = z.infer<typeof SingleDepartmentSchema>;

export const GetSingleDepartmentApiSchema = z.object({
  data: SingleDepartmentSchema,
});

export type GetSingleDepartmentApiType = z.infer<
  typeof GetSingleDepartmentApiSchema
>;
