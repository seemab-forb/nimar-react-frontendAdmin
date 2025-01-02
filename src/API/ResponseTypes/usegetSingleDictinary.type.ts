import { z } from "zod";

export const getSingleDictionaryApiResponseSchema = z.object({
  data: z.object({
    id: z.number(),
    dictionaryName: z.string(),
    words: z.array(
      z.object({
        id: z.number(),
        word: z.string(),
      })
    ),
    createdAt: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{6}\+\d{2}:\d{2}$/),
    updatedAt: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{6}\+\d{2}:\d{2}$/),
  }),
});

export type GetSingleDictionaryApiResponse = z.infer<
  typeof getSingleDictionaryApiResponseSchema
>;
