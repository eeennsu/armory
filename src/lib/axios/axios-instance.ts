import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: process.env.NODE_ENV === 'production' ? 10000 : 30000,
    headers: {
        'Content-Type': 'application/json',
    },
})
