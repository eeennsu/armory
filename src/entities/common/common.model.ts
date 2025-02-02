import { PaginationParams } from './common.types'

export const generateListPageParams = (pageParams?: PaginationParams) => {
    const page = pageParams?.page || 1
    const limit = pageParams?.limit || 10

    const searchParams = new URLSearchParams()

    const offset = (page - 1) * limit

    searchParams.append('offset', offset.toString())
    searchParams.append('limit', limit.toString())

    return searchParams.toString()
}
