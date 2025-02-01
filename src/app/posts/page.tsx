import { requestPosts } from '@/entities/post'
import { PostList } from '@/features/post'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import type { FC } from 'react'

const PostsPage: FC = () => {
    const queryClient = new QueryClient()

    // 데이터를 비동기로 미리 가져옴. 이때 가져온 데이터는 QueryClient에 캐싱됨.
    // prefetchQuery를 통해 캐시된 데이터를 hydrationBoundary 내부에서 호출할 경우 별도의 api 호출 없이 캐시된 데이터를 서버에서 사용할 수 있게 된다.
    // QueryClient는 서버에서 생성되었기 때문에 불러온 데이터는 html 파일에 함께 포함되어 SSR 페이지가 생성된다.

    queryClient.prefetchQuery({
        // pending status 를 dehydrate 하지 않는 버전에선 async await를 사용해야하지만, 그게 아니면 그냥 사용해도 된다. Pending Query는 클라이언트로 전송되어 완료될 때 까지 알아서 대기한다.
        queryKey: ['posts'],
        queryFn: requestPosts,
    })

    // 캐싱된 QueryClient에서 mutations와 queries를 추출하는 과정
    // 기본적으로 성공한 쿼리만 포함한다. 만약 실패한 쿼리도 포함하려면 두번째 인자의 옵션에서 shouldDehydrateQuery를 () => true 로 설정
    // return 값은, 해당 queryClient의 쿼리 캐시 데이터를 포함한 객체임. 이 데이터를 클라이언트에서 hydrationBoundary로 전달하면, 캐시된 데이터를 사용할 수 있음
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

/*
    Tanstack Query는 예외상황이 아니면 서버에서 데이터를 직접 호출하는 queryClient.fetchQuery를 권장하지 않는다. 
    이유는 서버에서 가져온 데이터는, revalidate (재검증) 할 방법이 없기 때문이다.
    동일한 쿼리에서, client component 에서 재검증이 일어나 데이터가 업데이트 되면, 서버 컴포넌트, 클라이언트 컴포넌트가 각각 동기화가 되지 않는 문제가 발생한다.

    만약 어찌저찌 사용해야 한다면, 정적인 데이터에 사용하거나 혹은 fetchQuery로 가져온 결과를 client component로 전달하지 않는 것이 좋다고 한다. 
    Tanstack Query 관점에선 단지 서버에선 데이터를 미리 가져오는 (prefetchQuery) 용도로만 사용하자!
*/

/*
    Tanstack Query와 Server Component 를 함께 사용하는 경우
        - 기존 Tanstack Query 앱을 Server Component로 마이그레이션 할 때
        - Server Component의 이점을 활용하면서도, Tanstack Query의 익숙한 프로그래밍 방식을 유지하고 싶을 때
        - 프레임워크에서 제공하지 않는 기능을 Tanstack Query로 구현해야 할 때

    next.js 의 app router에서 반드시 Tanstack Query를 같이 사용해야하는가? 는 아니다..
    Tanstack Query 조차도 기본 fetch를 사용해도 괜찮다고 한다. 
*/

/* 
    RSC (React Server Component) 는 Promise를 클라이언트에 직렬화하여 전달할 수 있다.
    서버에서 시작된 비동기 작업이, 그대로 클라이언트에 전달되어 계속 되는 것이다.
    클라이언트는 이 Promise를 받아서, 데이터가 준비되면 자동으로 업데이트된다.
*/
