import { pokeRequestHandler } from '@/lib/axios'
import { generateListPageParams, PaginationParams } from '../common'

export const requestPokemonList = (paginationParams?: PaginationParams) => {
    const searchParams = generateListPageParams(paginationParams)

    return pokeRequestHandler<{}, any>({
        url: `/pokemon?${searchParams}`,
    })
}

export const requestPokemon = (id: string) => {
    return pokeRequestHandler<{}, any>({
        url: `/pokemon/${id}`,
    })
}
