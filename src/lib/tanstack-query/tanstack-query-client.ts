import { defaultShouldDehydrateQuery, QueryClient, isServer } from '@tanstack/react-query'
import { cache } from 'react'

// export const getQueryClient = cache(() => new QueryClient())

// 서버 컴포넌트에서 매번 prefetchQuery or fetchQuery 를 할 때 매번 QueryClient를 새로 생성해야한다?
// 장점 : 모든 Server Component에서 동일한 QueryClient를 사용할 수 있다.
// 단점 : dehydrate(getQueryClient())를 통해 캐시된 데이터를 가져올 때마다 전체 QueryClient가 직렬화되므로, 불필요한 오버헤드가 발생할 수 있다.
//       이미 직렬화된 데이터까지, 또 직렬화하므로 성능에 영향을 줄 수 있다. 그렇기 때문에 위 방법은 추천하지 않는다.

const makeQueryProvider = () => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // SSR에서는 클라이언트에서 즉시 refetch 하는 것을 피하기 위해 staleTime을 0보다 크게 설정하는 것이 좋다.
            },

            // 서버에서는 pending 상태의 쿼리를 기본적으로 dehydrate 하지 않음.
            // v 5.40 부터는 pending 상태의 쿼리도 직렬화하여 클라이언트에 전송할 수 있다.
            // 이렇게 하면 데이터 프리페칭을 최대한 빨리 시작하고, 데이터가 준비되는 대로 클라이언트에 스트리밍할 수 있다.
            // 예를 들어, 무한 스크롤에서 첫 페이지를 렌더링하면서 두번쨰 페이지를 미리 프리패칭할 수 있다.
            dehydrate: {
                shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
            },
        },
    })
}

let browserQueryClient: QueryClient | undefined

export const getQueryClient = () => {
    // server side일 경우
    if (isServer) {
        return makeQueryProvider()
    }

    // client side 일 경우
    else {
        // browserQueryClient가 없을 경우에만 새로 만들어서 실행한다.
        if (!browserQueryClient) {
            browserQueryClient = makeQueryProvider()
        }
        return browserQueryClient
    }
}
