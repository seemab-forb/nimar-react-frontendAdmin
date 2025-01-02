import { z } from "zod";
import { SingleUserSchema } from "./GetAllUsersApi";



export const SingleUserApiResponseSchema = z.object({ data: z.object({ results: SingleUserSchema }) });

export type SingleUserApiResponseType = z.infer<typeof SingleUserApiResponseSchema>;
