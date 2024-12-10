'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HomeIcon, Users, LayoutDashboard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ThemeChange } from './theme/theme-change'
import { useDeviceCode } from '@/hooks/device/use-device-code'

export function Header() {
    const pathname = usePathname()
    const { isAuthenticated } = useDeviceCode()

    const navItems = [
        ...(isAuthenticated
            ? [
                {
                    name: 'Dashboard',
                    path: '/dashboard',
                    icon: <LayoutDashboard className='w-4 h-4' />
                }
            ]
            : [
                {
                    name: 'Home',
                    path: '/',
                    icon: <HomeIcon className='w-4 h-4' />
                }
            ]
        ),
        {
            name: 'About',
            path: '/about',
            icon: <Users className='w-4 h-4' />
        }
    ]

    return (
        <header className='flex justify-between items-center px-6 py-4 shadow-md sticky top-0 z-10 bg-background'>
            <div className='inline-flex items-center rounded-lg bg-muted p-1.5 gap-2'>
                {navItems.map((item) => (
                    <div key={item.path} className='relative'>
                        <Button
                            variant={'ghost'}
                            asChild
                            className='relative px-4 sm:px-8 py-2.5 flex items-center gap-2 transition-all duration-300'
                        >
                            <Link href={item.path}>
                                <span className='relative z-20 flex items-center gap-3'>
                                    {item.icon}
                                    <span className='hidden sm:inline'>{item.name}</span>
                                </span>
                            </Link>
                        </Button>
                        {pathname === item.path && (
                            <motion.div
                                layoutId='active-pill'
                                className='absolute inset-0 bg-background rounded-md'
                                style={{ zIndex: 10 }}
                                transition={{
                                    type: 'spring',
                                    bounce: 0.3,
                                    duration: 0.6,
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>
            <ThemeChange />
        </header>
    )
} 