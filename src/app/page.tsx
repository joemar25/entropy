'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { HomeIcon, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import HomeContent from '@/components/custom/home/home-content'
import AboutContent from '@/components/custom/home/about-content'

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

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKeys>('Home')

  return (
    <div className='min-h-screen p-8 flex flex-col items-center'>
      <Card className='w-full max-w-3xl'>
        {/* Navigation */}
        <div className='px-6 pt-6 flex justify-center'>
          <div className='inline-flex items-center rounded-lg bg-muted p-1.5 gap-2'>
            {(Object.keys(tabs) as TabKeys[]).map((tab) => (
              <div key={tab} className='relative'>
                <Button
                  variant='ghost'
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-8 py-2.5 flex items-center gap-2 transition-all duration-300`}
                >
                  <span className='relative z-20 flex items-center gap-3'>
                    {tabs[tab].icon}
                    {tab}
                  </span>
                </Button>
                {activeTab === tab && (
                  <motion.div
                    layoutId='active-pill'
                    className='absolute inset-0 bg-background rounded-md'
                    style={{ zIndex: 10 }}
                    transition={{
                      type: 'spring',
                      bounce: 0.3,
                      duration: 0.6
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20
          }}
        >
          <CardContent>
            {tabs[activeTab].content}
          </CardContent>
        </motion.div>
      </Card>
    </div>
  )
}