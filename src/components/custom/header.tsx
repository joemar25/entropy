'use client'

import AboutContent from './home/about-content'

import { motion } from 'framer-motion'
import HomeContent from './home/home-content'
import { HomeIcon, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeChange } from './theme/theme-change'

type TabContent = {
    content: React.ReactNode
    icon: React.ReactNode
}

type TabsType = {
    [key: string]: TabContent
}

const tabs: TabsType = {
    Home: {
        content: <HomeContent />,
        icon: <HomeIcon className='w-4 h-4' />
    },
    About: {
        content: <AboutContent />,
        icon: <Users className='w-4 h-4' />
    },
}

type TabKeys = keyof typeof tabs

interface HeaderProps {
    activeTab: TabKeys
    setActiveTab: (tab: TabKeys) => void
}

export function Header({ activeTab, setActiveTab }: HeaderProps) {
    return (
        <header className="flex justify-between items-center px-6 py-4 shadow-md sticky top-0 z-10 bg-background">
            <div className="inline-flex items-center rounded-lg bg-muted p-1.5 gap-2">
                {(Object.keys(tabs) as TabKeys[]).map((tab) => (
                    <div key={tab} className="relative">
                        <Button
                            variant={'ghost'}
                            onClick={() => setActiveTab(tab)}
                            className="relative px-4 sm:px-8 py-2.5 flex items-center gap-2 transition-all duration-300"
                        >
                            <span className="relative z-20 flex items-center gap-3">
                                {tabs[tab].icon}
                                <span className="hidden sm:inline">{tab}</span>
                            </span>
                        </Button>
                        {activeTab === tab && (
                            <motion.div
                                layoutId="active-pill"
                                className="absolute inset-0 bg-background rounded-md"
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