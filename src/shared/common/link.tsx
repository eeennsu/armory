import type { ComponentPropsWithoutRef, FC } from 'react'
import { twMerge } from 'tailwind-merge'
import NextLink, { LinkProps } from 'next/link'

type Props = LinkProps & ComponentPropsWithoutRef<'a'>

export const Link: FC<Props> = ({ className, ...props }) => {
    return (
        <NextLink
            className={twMerge('text-2xl font-bold text-blue-500 hover:text-3xl', className)}
            {...props}
        />
    )
}
