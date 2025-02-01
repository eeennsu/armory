import { z } from 'zod'
import { paginationParamsSchema } from './common.schema'

export type PaginationParams = z.infer<typeof paginationParamsSchema>
