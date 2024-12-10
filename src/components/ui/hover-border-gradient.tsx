'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useState, useEffect, useCallback, useMemo } from 'react'


type Direction = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT'

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = 'button',
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<{
  as?: React.ElementType
  containerClassName?: string
  className?: string
  duration?: number
  clockwise?: boolean
} & React.HTMLAttributes<HTMLElement>>) {
  const [hovered, setHovered] = useState<boolean>(false)
  const [direction, setDirection] = useState<Direction>('TOP')

  // Memoized function to calculate the next direction
  const rotateDirection = useCallback(
    (currentDirection: Direction): Direction => {
      const directions: Direction[] = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT']
      const currentIndex = directions.indexOf(currentDirection)
      const nextIndex = clockwise
        ? (currentIndex - 1 + directions.length) % directions.length
        : (currentIndex + 1) % directions.length
      return directions[nextIndex]
    },
    [clockwise]
  )

  // Memoized map of gradient directions
  const movingMap = useMemo<Record<Direction, string>>(
    () => ({
      TOP: 'radial-gradient(20.7% 50% at 50% 0%, var(--gradient-top) 0%, rgba(255, 255, 255, 0) 100%)',
      LEFT: 'radial-gradient(16.6% 43.1% at 0% 50%, var(--gradient-left) 0%, rgba(255, 255, 255, 0) 100%)',
      BOTTOM: 'radial-gradient(20.7% 50% at 50% 100%, var(--gradient-bottom) 0%, rgba(255, 255, 255, 0) 100%)',
      RIGHT: 'radial-gradient(16.2% 41.199999999999996% at 100% 50%, var(--gradient-right) 0%, rgba(255, 255, 255, 0) 100%)',
    }),
    []
  )

  // Memoized highlight gradient
  const highlight = useMemo(
    () =>
      'radial-gradient(75% 181.15942028999996% at 50% 50%, var(--gradient-highlight) 0%, rgba(255, 255, 255, 0) 100%)',
    []
  )

  // Effect to handle direction rotation
  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState))
      }, duration * 1000)
      return () => clearInterval(interval)
    }
  }, [hovered, duration, rotateDirection])

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative flex rounded-md border content-center bg-black/20 hover:bg-black/10 transition duration-500 dark:bg-white/20 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit',
        containerClassName
      )}
      style={
        {
          '--gradient-top': 'hsl(0, 0%, 100%)',
          '--gradient-left': 'hsl(0, 0%, 100%)',
          '--gradient-bottom': 'hsl(0, 0%, 100%)',
          '--gradient-right': 'hsl(0, 0%, 100%)',
          '--gradient-highlight': '#3275F8',
        } as React.CSSProperties
      }
      {...props}
    >
      <div
        className={cn(
          'w-auto text-white z-10 bg-black px-4 py-2 rounded-[inherit]',
          className
        )}
      >
        {children}
      </div>
      <motion.div
        className={cn(
          'flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]'
        )}
        style={{
          filter: 'blur(2px)',
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: 'linear', duration: duration ?? 1 }}
      />
      <div className='bg-black absolute z-1 flex-none inset-[2px] rounded-[100px]' />
    </Tag>
  )
}