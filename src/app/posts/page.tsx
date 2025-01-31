import { requestPosts } from '@/entities/post'
import { PostList } from '@/features/post'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import type { FC } from 'react'

const PostsPage: FC = async () => {
    const queryClient = new QueryClient()

    // 데이터를 비동기로 미리 가져옴. 이때 가져온 데이터는 QueryClient에 캐싱됨.
    // prefetchQuery를 통해 캐시된 데이터를 hydrationBoundary 내부에서 호출할 경우 별도의 api 호출 없이 캐시된 데이터를 서버에서 사용할 수 있게 된다.
    // QueryClient는 서버에서 생성되었기 때문에 불러온 데이터는 html 파일에 함께 포함되어 SSR 페이지가 생성된다.
    await queryClient.prefetchQuery({
        queryKey: ['posts'],
        queryFn: requestPosts,
    })

    // 캐싱된 QueryClient에서 mutations와 queries를 추출하는 과정
    // 기본적으로 성공한 쿼리만 포함한다. 만약 실패한 쿼리도 포함하려면 두번째 인자의 옵션에서 shouldDehydrateQuery를 () => true 로 설정
    // return 값은, 모든 쿼리 캐시 데이터를 포함한 객체임. 이 데이터를 클라이언트에서 hydrationBoundary로 전달하면, 캐시된 데이터를 사용할 수 있음
    // 하지만 이 데이터 구조는 Tanstack Query 내부에서 변경될 수 있기 때문에, 직접 데이터를 분석하는 것은 위험 (public API가 아님)
    const dehydratedState = dehydrate(queryClient)

    return (
        <main>
            {/* HydrationBoundary는 하위에서 캐시된 데이터를 서버에서 사용할 수 있도록 해줌. 캐시된 데이터와 dehydrate된 데이터를 비교하여 가장 최신의 데이터를 유지. */}
            {/* 만약 state를 할당하지 않으면 캐시된 데이터를 그대로 사용함. */}
            <HydrationBoundary state={dehydratedState}>
                <PostList />
            </HydrationBoundary>
        </main>
    )
}

export default PostsPage

/*
    dehydrate란? 서버에서 미리 데이터를 저장하는 기능 
    hydrate란? 클라이언트에서 dehydrate된 데이터를 복원하는 기능
*/
