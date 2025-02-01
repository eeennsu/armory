import { jphRequestHandler } from '@/lib/axios'

export const requestPosts = () => {
    return jphRequestHandler<undefined, any>({ url: '/posts' })
}
