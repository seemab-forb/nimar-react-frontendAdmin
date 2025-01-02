import { z } from "zod";

export const getAllAlertsSchema = z.object({
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
    circles: z.object({
      id: z.number(),
      name: z.string(),
      departments: z.array(z.number()),
    }),
  }),
});
export type getAllAlertsType = z.infer<typeof getAllAlertsSchema>;

export const getPaginatedAllAlertsSchema = z.object({
  count: z.number(),
  next: z.nullable(z.string()),
  previous: z.nullable(z.string()),
  page_size: z.number(),
  current_page: z.number(),
  total_pages: z.number(),
});

export type getPaginatedAllAlertsType = z.infer<
  typeof getPaginatedAllAlertsSchema
>;

export const GetAllAlertsApiResponseSchema = z
  .object({
    results: z.array(getAllAlertsSchema),
    pagination_data: getPaginatedAllAlertsSchema,
  })
  .strict();

export type GetAllAlertsApiResponse = z.infer<
  typeof GetAllAlertsApiResponseSchema
>;
