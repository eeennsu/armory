import axios from 'axios'

const defaultTimeout = process.env.NODE_ENV === 'production' ? 10000 : 30000

export const jphInst = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: defaultTimeout,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const pokemonInst = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon',
    timeout: defaultTimeout,
    headers: {
        'Content-Type': 'application/json',
    },
})
