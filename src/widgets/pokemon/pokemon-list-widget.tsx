'use client'

import { queries } from '@/entities/common/common.query'
import { Pagination } from '@/features/common/pagination/pagination'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useState, type FC } from 'react'

const PER_PAGE = 10

export const PokemonListWidget: FC = () => {
    const [page, setPage] = useState<number>(1)

    const { data } = useSuspenseQuery({
        ...queries.pokemons.list({ page, limit: PER_PAGE }),
    })

    return (
        <section>
            {data?.results.map((pokemon: any) => {
                return <div key={pokemon.name}>{pokemon.name}</div>
            })}
            <Pagination
                page={page}
                total={data?.count}
                perPage={PER_PAGE}
                onPageChange={setPage}
            />
        </section>
    )
}
