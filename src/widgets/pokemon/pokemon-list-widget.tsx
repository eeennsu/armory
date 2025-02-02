'use client'

import { type FC } from 'react'
import { queries } from '@/entities/common/common.query'
import { Pagination } from '@/features/common/pagination/pagination'
import { usePagination } from '@/lib/hooks'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { pathKeys } from '@/main/route'
import { pokemonQueryKeys, requestPokemonList } from '@/entities/pokemon'

export const PokemonListWidget: FC = () => {
    const { page, setPage } = usePagination()

    // (1) Query Key만을 관리하는 방법
    const { data } = useSuspenseQuery({
        queryKey: pokemonQueryKeys.list({ page }),
        queryFn: () => requestPokemonList({ page }),
    })

    // (2) Query 자체를 추상화하여 관리하는 방법
    // const { data } = useSuspenseQuery({
    //     ...queries.pokemons.list({ page }),
    // })

    return (
        <section>
            <div className='flex flex-col gap-1'>
                {data?.results.map((pokemon: any) => {
                    return (
                        <Link
                            className='hover:underline'
                            key={pokemon.name}
                            href={pathKeys.pokemon({ detailId: pokemon.name })}
                        >
                            {pokemon.name}
                        </Link>
                    )
                })}
            </div>
            <Pagination
                page={page}
                total={data?.count}
                onPageChange={setPage}
            />
        </section>
    )
}
