import Link from 'next/link'
import { FC } from 'react'

const HomePage: FC = () => {
    return (
        <main className='flex flex-col items-center justify-center h-screen space-y-4'>
            <Link
                className='text-2xl font-bold text-blue-500 hover:text-3xl'
                href={'/posts'}
            >
                Post
            </Link>
        </main>
    )
}

export default HomePage
