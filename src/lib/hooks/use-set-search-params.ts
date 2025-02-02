'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const useSetSearchParams = () => {
    const router = useRouter()
    const pathname = usePathname()
    const _searchParams = useSearchParams()
    const searchParams = new URLSearchParams(_searchParams.toString())

    const setNewSearchParams = (params: Record<string, string>) => {
        for (const [key, value] of Object.entries(params)) {
            if (value) {
                searchParams.set(key, value)
            } else {
                searchParams.delete(key)
            }
        }

        return searchParams.toString()
    }

    const setSearchParams = (params: Record<string, string>) => {
        const newSearchParams = setNewSearchParams(params)
        router.push(`${pathname}?${newSearchParams}`)
    }

    return {
        searchParams,
        setSearchParams,
    }
}
