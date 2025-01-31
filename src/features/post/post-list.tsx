'use client'

import { requestPosts } from '@/entities/post'
import { useQuery } from '@tanstack/react-query'
import type { FC } from 'react'

export const PostList: FC = () => {
    const { data } = useQuery({
        queryKey: ['posts'],
        queryFn: requestPosts,
    })

    return <section>{JSON.stringify(data)}</section>
}
