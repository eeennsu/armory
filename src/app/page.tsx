import { pathKeys } from '@/main/route'
import { Link } from '@/shared/common'
import { FC } from 'react'

const HomePage: FC = () => {
    return (
        <main className='flex flex-col items-center justify-center h-screen space-y-4'>
            <Link href={pathKeys.post()}>Post</Link>
            <Link href={pathKeys.pokemon()}>Pokemon</Link>
        </main>
    )
}

export default HomePage
