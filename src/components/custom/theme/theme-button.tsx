'use client'

import { useTheme } from 'next-themes'
import { Icons } from '@/components/custom/icons'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

export function ThemeMenu() {
    const { setTheme, theme } = useTheme()

    return (
        <DropdownMenuItem
            className='gap-2 cursor-pointer'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
            {theme === 'dark' ? (
                <>
                    <Icons.lightBulb className='mr-2 h-4 w-4 text-muted-foreground' />
                    Light Mode
                </>
            ) : (
                <>
                    <Icons.moon className='mr-2 h-4 w-4 text-muted-foreground' />
                    Dark Mode
                </>
            )}
        </DropdownMenuItem>
    )
}
