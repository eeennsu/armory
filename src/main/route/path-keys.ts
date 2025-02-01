export const pathKeys = {
    root: '/',
    post: () => {
        return pathKeys.root.concat('post')
    },
    pokemon: (params: RouteParams = {}) => {
        return generateListDetailPath('pokemon', params)
    },
}

type RouteParams = {
    detailId?: string | number
}

const generateListDetailPath = (path: string, { detailId }: RouteParams, root: string = pathKeys.root) => {
    return root.concat(path).concat(detailId ? `/${detailId}` : '')
}
