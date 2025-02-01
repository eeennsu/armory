import { z } from 'zod'

export const paginationParamsSchema = z.object({
    page: z.number().int().positive().default(1),
    limit: z.number().int().positive().default(10),
})
