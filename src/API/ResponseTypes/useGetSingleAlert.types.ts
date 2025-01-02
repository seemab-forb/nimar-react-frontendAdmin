import { z } from "zod";
import { CircleDataTypeSchema } from "./useGetAllCircles.types";
export const getSingleAlertsSchema = z.object({
  id: z.number(),
  alertSource: z.string(),
  department: z.number(),
  alertName: z.string(),
  alertDictionaries: z.array(
    z.object({
      id: z.number(),
      dictionaryName: z.string(),
      words: z.array(
        z.object({
          id: z.number(),
          word: z.string(),
        })
      ),
      createdAt: z.string(),
      updatedAt: z.string(),
    })
  ),
  members: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
  createdAt: z.string(),
  updatedAt: z.string(),
  circlesalert: z.object({
    circle: CircleDataTypeSchema,
  }),
});
export type getSingleAlertsType = z.infer<typeof getSingleAlertsSchema>;
