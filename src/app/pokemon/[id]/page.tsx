import { queries } from '@/entities/common/common.query'
import { getQueryClient } from '@/lib/tanstack-query'
import { PokemonDetailWidget } from '@/widgets/pokemon'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import type { FC } from 'react'

interface Props {
    params: Promise<{ id: string }>
}

const PokemonDetailPage: FC<Props> = async ({ params }) => {
    const pokemonId = (await params).id

    const queryClient = getQueryClient()

    queryClient.prefetchQuery({ ...queries.pokemons.detail({ pokemonId }) })

    return (
        <main>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <PokemonDetailWidget pokemonId={pokemonId} />
            </HydrationBoundary>
        </main>
    )
}

export default PokemonDetailPage

// export const generateStaticParams = async () => {
//     const queryClient = getQueryClient()

//     const result = await queryClient.fetchQuery({
//         ...queries.pokemons.list(),
//     })

//     return result.results.map((pokemon: any) => ({
//         id: pokemon.name,
//     }))
// }
