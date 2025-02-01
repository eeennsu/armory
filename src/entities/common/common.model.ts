import { PaginationParams } from './common.types'

export const generateListPageParams = ({ page, limit }: PaginationParams) => {
    const searchParams = new URLSearchParams()

    const offset = (page - 1) * limit

    searchParams.append('offset', offset.toString())
    searchParams.append('limit', limit.toString())

    return searchParams.toString()
}
