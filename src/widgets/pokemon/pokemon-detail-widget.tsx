'use client'

import { queries } from '@/entities/common/common.query'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import type { FC } from 'react'

interface Props {
    pokemonId: string
}

export const PokemonDetailWidget: FC<Props> = ({ pokemonId }) => {
    const { data } = useSuspenseQuery({
        ...queries.pokemons.detail({ pokemonId }),
    })

    return <section>{JSON.stringify(data)}</section>
}
