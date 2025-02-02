'use client'

import { useSetSearchParams } from './use-set-search-params'

export const usePagination = () => {
    const { setSearchParams, searchParams } = useSetSearchParams()

    const page = Number(searchParams.get('page')) || 1
    const setPage = (page: number) => setSearchParams({ page: String(page) })

    return {
        page,
        setPage,
    }
}
