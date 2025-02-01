import { mergeQueryKeys } from '@lukemorales/query-key-factory'
import { pokemonQueryKeys } from '../pokemon'

export const queries = mergeQueryKeys(pokemonQueryKeys)
