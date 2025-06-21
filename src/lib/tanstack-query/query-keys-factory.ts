const QUERY_KEYS = {
    ALL: 'ALL',
    LIST: 'LIST',
    DETAIL: 'DETAIL',
} as const

export const ENTITIES = {
    POST: 'POST',
    POKEMON: 'POKEMON',
} as const

type Entity = (typeof ENTITIES)[keyof typeof ENTITIES]
type EntityId = string | number
type PageParams = { page: number; keyword?: string }

type QueryKeyFactory<T extends Entity> = {
    all: () => [T, typeof QUERY_KEYS.ALL]
    list: (params: PageParams) => [T, typeof QUERY_KEYS.LIST, ...Array<string | number>]
    detail: ({ id }: { id: EntityId }) => [T, typeof QUERY_KEYS.DETAIL, EntityId]
}

export const generateQueryKeys = <T extends Entity>(prefix: T): QueryKeyFactory<T> => {
    return {
        all: () => [prefix, QUERY_KEYS.ALL] as const,
        list: (params) => {
            const values = Object.values(params).filter((value) => value !== undefined)

            return [prefix, QUERY_KEYS.LIST, ...values] as const
        },
        detail: ({ id }) => [prefix, QUERY_KEYS.DETAIL, id] as const,
    }
}
