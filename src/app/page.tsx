'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { HomeIcon, Users } from 'lucide-react'
import { CardContent } from '@/components/ui/card'

import HomeContent from '@/components/custom/home/home-content'
import AboutContent from '@/components/custom/home/about-content'
import { Header } from '@/components/custom/header'

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
    <div className="min-h-screen flex flex-col">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content Area */}
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className="w-full max-w-3xl"
        >
          <CardContent>
            {tabs[activeTab].content}
          </CardContent>
        </motion.div>
      </div>
    </div>
  )
}