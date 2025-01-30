import { requestPosts } from '@/entities/post'
import { PostList } from '@/features/post'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import type { FC } from 'react'

const PostsPage: FC = async () => {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['posts'],
        queryFn: requestPosts,
    })

    return (
        <main>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <PostList />
            </HydrationBoundary>
        </main>
    )
}

export default PostsPage
