'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

export default function NotFound() {
    return (
        <div className='h-screen w-full flex flex-col items-center justify-center gap-4'>
            <h1 className='text-4xl font-bold'>404</h1>
            <h2 className='text-xl text-muted-foreground'>Page Not Found</h2>
            <p className='text-center text-muted-foreground max-w-[500px] mt-4'>
                The page you&aposre looking for doesn&apost exist or has been moved.
            </p>
            <Link href='/' className='mt-4'>
                <Button variant={'outline'} className='gap-2'>
                    <Home size={16} />
                    Return Home
                </Button>
            </Link>
        </div>
    )
}