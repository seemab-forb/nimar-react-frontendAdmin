// import { z } from "zod";

import { z } from "zod";

export const SingleServiceStatusSchema = z.object({
  status: z.boolean(),
});

export type SingleServiceStatusType = z.infer<typeof SingleServiceStatusSchema>;

export const ServiceStatusApiResponseSchema = z.object({
  frontend: SingleServiceStatusSchema,
  backend: SingleServiceStatusSchema,
  streaming: SingleServiceStatusSchema,
  ocr: SingleServiceStatusSchema,
  sentiment: SingleServiceStatusSchema,
  stt: SingleServiceStatusSchema,
  scd: SingleServiceStatusSchema,
  webContent: SingleServiceStatusSchema,
  translation: SingleServiceStatusSchema,
  summary: SingleServiceStatusSchema,
});

export type ServiceStatusApiResponseType = z.infer<
  typeof ServiceStatusApiResponseSchema
>;
