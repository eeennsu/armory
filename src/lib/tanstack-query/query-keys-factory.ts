export const entities = {
    POST: 'post',
    POKEMON: 'pokemon',
} as const

type Entity = (typeof entities)[keyof typeof entities]
type EntityId = string | number
type PageParams = { page: number; keyword?: string }

type QueryKeyFactory<T extends Entity> = {
    all: () => [T, 'all']
    list: (params: PageParams) => [T, 'list', ...Array<string | number>]
    detail: ({ id }: { id: EntityId }) => [T, 'detail', EntityId]
}

export const generateQueryKeys = <T extends Entity>(prefix: T): QueryKeyFactory<T> => {
    return {
        all: () => [prefix, 'all'] as const,
        list: (params) => {
            const values = Object.values(params).filter((value) => value !== undefined)

            return [prefix, 'list', ...values] as const
        },
        detail: ({ id }) => [prefix, 'detail', id] as const,
    }
}
