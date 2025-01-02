import { z } from "zod";
import { SingleDepartmentSchema } from "./getSingleDepartmentApi";

export type SingleDepartmentType = z.infer<typeof SingleDepartmentSchema>;

export const GetAllDepartmentsSchema = z.object({
  data: z.array(SingleDepartmentSchema),
});

export type GetAllDepartmentsType = z.infer<typeof GetAllDepartmentsSchema>;
