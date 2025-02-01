'use client'

import { requestPosts } from '@/entities/post'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import type { FC } from 'react'

export const PostList: FC = () => {
    // pending status의 쿼리를 직렬화하지 않는다면, 상위 서버컴포넌트에서의 prefetchQuery 에서 async await를 사용해야한다.
    // 하지만 그것이 아니면 useQuery가 아닌 useSuspenseQuery를 사용하지만, useQuery를 사용해도 된다.
    // const { data } = useQuery({
    //     queryKey: ['posts'],
    //     queryFn: requestPosts,
    // })

    const { data, status } = useSuspenseQuery({
        queryKey: ['posts'],
        queryFn: requestPosts,
    })

    console.log(status)

    return <section>{JSON.stringify(data)}</section>
}

/* 
    useQuery와 useSuspenseQuery의 차이점
        
                                 useQuery                              |     useSuspenseQuery
--------------------------------------------------------------------------------------------
서버 렌더링         지원 (서버에서 데이터를 렌더링)                              미지원 (클라이언트에서만 데이터 처리)
로딩 상태 처리      Suspense가 대체 UI를 보여줄 것임(next 에선 loading.tsx)      isLoading 상태를 수동으로 처리

*/
