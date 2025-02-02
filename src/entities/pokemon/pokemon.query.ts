import { requestPokemon, requestPokemonList } from './pokemon.api'
import { PaginationParams } from '../common'
import { createQueryKeys } from '@lukemorales/query-key-factory'
import { generateQueryKeys } from '@/lib/tanstack-query/query-keys-factory'

// 방법 1. Query Key 만을 추상화하여 업그레이드 시킨 방법
export const pokemonQueryKeys = generateQueryKeys('pokemon')

// 방법 2. 공식문서의 Effective React Query Keys에서, query key만이 아닌 Query 자체를 하나로 추상화하여 업그레이드 시킨 방법
export const pokemonQueries = createQueryKeys('pokemons', {
    detail: ({ pokemonId }: { pokemonId: string }) => ({
        queryKey: [pokemonId],
        queryFn: () => requestPokemon(pokemonId),
    }),
    list: (pageParams: PaginationParams = { page: 1, limit: 10 }) => ({
        queryKey: [{ pageParams }],
        queryFn: () => requestPokemonList({ ...pageParams }),

        // 다른 쿼리의 컨텍스트 또는 상황에 의존적이거나 관련되어 있을 때 사용
        contextQueries: {
            page: (page: number) => ({
                queryKey: [page],
                queryFn: () => requestPokemonList({ ...pageParams, page }),
            }),

            // search 같은 것이 있다면 이렇게 사용
            // search: (keyword: string) => ({
            //     queryKey: [keyword],
            //     queryFn: () => requestPokemonList({ ...pageParams, keyword }),
            // })
        },
    }),
})
