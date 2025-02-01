import { createQueryKeys } from '@lukemorales/query-key-factory'
import { requestPokemon, requestPokemonList } from './pokemon.api'
import { PaginationParams } from '../common'

export const pokemonQueryKeys = createQueryKeys('pokemons', {
    detail: (pokemonId: string) => ({
        queryKey: [pokemonId],
        queryFn: () => requestPokemon(pokemonId),
    }),
    list: (pageParams: PaginationParams = { page: 1, limit: 10 }) => ({
        queryKey: [{ pageParams }],
        queryFn: () => requestPokemonList({ ...pageParams }),
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
