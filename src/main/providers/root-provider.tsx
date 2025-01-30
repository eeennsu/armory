import type { FC, PropsWithChildren } from 'react'
import { TanstackQueryProvider } from './modules'

export const RootProvider: FC<PropsWithChildren> = ({ children }) => {
    return <TanstackQueryProvider>{children}</TanstackQueryProvider>
}
