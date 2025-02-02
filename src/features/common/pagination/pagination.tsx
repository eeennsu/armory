'use client'

import type { FC } from 'react'

type Props = {
    page: number
    total: number
    onPageChange: (page: number) => void
    perPage?: number
    maxPagesToShow?: number
}

export const Pagination: FC<Props> = ({ page, total, onPageChange, perPage = 10, maxPagesToShow = 5 }) => {
    const totalPages = Math.ceil(total / perPage)
    const hasPrevious = page > 1
    const hasNext = page < totalPages

    const currentGroup = Math.ceil(page / maxPagesToShow)
    const startPage = (currentGroup - 1) * maxPagesToShow + 1
    const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages)
    const visiblePagesCount = endPage - startPage + 1
    const pages = Array.from({ length: visiblePagesCount }, (_, i) => startPage + i)

    return (
        <div className='flex items-center gap-2'>
            <button
                onClick={() => onPageChange(1)}
                disabled={!hasPrevious}
                className='px-3 py-1 border rounded disabled:opacity-50'
            >
                ⏮ First
            </button>

            <button
                onClick={() => onPageChange(page - 1)}
                disabled={!hasPrevious}
                className='px-3 py-1 border rounded disabled:opacity-50'
            >
                ◀ Previous
            </button>

            {currentGroup >= 2 && <span className='px-2'>...</span>}

            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    className={`px-3 py-1 border rounded ${p === page ? 'bg-blue-500 text-white' : ''}`}
                >
                    {p}
                </button>
            ))}

            {currentGroup * maxPagesToShow < totalPages && <span className='px-2'>...</span>}
            <button
                onClick={() => onPageChange(page + 1)}
                disabled={!hasNext}
                className='px-3 py-1 border rounded disabled:opacity-50'
            >
                Next ▶
            </button>

            <button
                onClick={() => onPageChange(totalPages)}
                disabled={!hasNext}
                className='px-3 py-1 border rounded disabled:opacity-50'
            >
                ⏭ Last
            </button>
        </div>
    )
}
