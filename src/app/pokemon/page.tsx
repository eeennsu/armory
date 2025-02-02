import { queries } from '@/entities/common/common.query'
import { pokemonQueryKeys, requestPokemonList } from '@/entities/pokemon'
import { getQueryClient } from '@/lib/tanstack-query'
import { PokemonListWidget } from '@/widgets/pokemon'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import type { FC } from 'react'

const PokemonListPage: FC = async () => {
    const queryClient = getQueryClient()

    // (1) Query Key만을 관리하는 방법
    queryClient.prefetchQuery({
        queryKey: pokemonQueryKeys.list({ page: 1 }),
        queryFn: () => requestPokemonList({ page: 1 }),
    })

    // (2) Query 자체를 추상화하여 관리하는 방법
    // queryClient.prefetchQuery({
    //     ...queries.pokemons.list(),
    // })

    return (
        <main>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <PokemonListWidget />
            </HydrationBoundary>
        </main>
    )
}

export default PokemonListPage
