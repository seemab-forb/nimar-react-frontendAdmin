import { z } from "zod";

export const getStopWordsDictionaryApiResponseSchema = z.array(
  z
    .object({
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
    .strict()
);

export type GetStopWordsDictionaryApiResponse = z.infer<
  typeof getStopWordsDictionaryApiResponseSchema
>;
