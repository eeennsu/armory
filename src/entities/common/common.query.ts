import { mergeQueryKeys } from '@lukemorales/query-key-factory'
import { pokemonQueries } from '../pokemon'

// 방법 2로 인한 업그레이드
export const queries = mergeQueryKeys(pokemonQueries)

