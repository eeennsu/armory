'use client'

import { getQueryClient } from '@/lib/tanstack-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { FC, PropsWithChildren } from 'react'

export const TanstackQueryProvider: FC<PropsWithChildren> = ({ children }) => {
    // QueryClient를 useState를 사용해 초기화하면 안된다.
    // suspense boundary가 없을 경우 React의 렌더링이 중단될 수도 있고
    // queryClient 자체를 폐기할 수 도 있다.
    const queryClient = getQueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

// 기존의 일반 CSR React에선 queryClient를 생성하고 이를 계속 사용해왔다.
// 하지만 prefetching을 기능을 사용할 경우 서버에서도 queryClient를 생성하여 사용해야 하기 때문에 서버에서 queryClient를 생성했을 경우 다시 생성하지 않게 해야한다.
