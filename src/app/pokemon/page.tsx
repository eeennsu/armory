import { queries } from '@/entities/common/common.query'
import { PokemonListWidget } from '@/widgets/pokemon'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import type { FC } from 'react'

const PokemonListPage: FC = () => {
    const queryClient = new QueryClient()

    queryClient.prefetchQuery({
        ...queries.pokemons.list(),
    })

    return (
        <main>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <PokemonListWidget />
            </HydrationBoundary>
        </main>
    )
}

export default PokemonListPage
