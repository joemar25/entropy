'use client'

import type { ChartDataPoint } from '@/types/device'

import CustomTooltip from '@/components/ui/CustomTooltip'
import ChartCard from '@/components/ui/ChartCard'

import { useState } from 'react'
import { styles } from '@/utils/styles'
import { metrics } from '@/constants/metric'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'

interface AreaChartProps {
    data: ChartDataPoint[]
}

export function DashboardAreaChart({ data }: AreaChartProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <ChartCard
            title="Area Chart"
            dataLength={data.length}
            isExpanded={isExpanded}
            onToggleExpand={() => setIsExpanded(!isExpanded)}
        >
            <ResponsiveContainer width='100%' height={300}>
                <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='time' />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    {metrics.map((metric) => (
                        <Area
                            key={metric.key}
                            type='monotone'
                            dataKey={metric.key}
                            stroke={metric.color}
                            fill={metric.color}
                            className={styles.chartLine}
                        />
                    ))}
                </AreaChart>
            </ResponsiveContainer>
        </ChartCard>
    )
} 