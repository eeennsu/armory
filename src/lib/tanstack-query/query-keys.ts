type QueryKeyFactory<T extends string, P = { page: number }> = {
    all: () => [T, 'all']
    list: (params: P) => [T, 'list', P]
    detail: ({ id }: { id: string | number }) => [T, 'detail', { id: string | number }]
}

export const createQueryKeyFactory = <T extends string, P = { page: number }>(prefix: string) => {
    return {
        all: () => [prefix, 'all'] as const,
        list: (params: P) => [prefix, 'list', params] as const,
        detail: ({ id }: { id: string | number }) => [prefix, 'detail', { id }] as const,
    } as QueryKeyFactory<T, P>
}
