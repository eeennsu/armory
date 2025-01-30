import { requestHandler } from '@/lib/axios/request-handler'

export const requestPosts = () => {
    return requestHandler<undefined, any>({ url: '/posts' })
}
