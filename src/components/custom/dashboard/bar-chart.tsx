'use client'

import type { ChartDataPoint } from '@/types/device'

import ChartCard from '@/components/custom/dashboard/chart-card'
import CustomTooltip from '@/components/custom/dashboard/custom-tooltip'

import { useState } from 'react'
import { styles } from '@/utils/styles'
import { metrics } from '@/constants/metric'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'

interface BarChartProps {
    data: ChartDataPoint[]
}

export function DashboardBarChart({ data }: BarChartProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <ChartCard
            title="Bar Chart"
            dataLength={data.length}
            isExpanded={isExpanded}
            onToggleExpand={() => setIsExpanded(!isExpanded)}
        >
            <ResponsiveContainer width='100%' height={300}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='time' />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    {metrics.map((metric) => (
                        <Bar
                            key={metric.key}
                            dataKey={metric.key}
                            fill={metric.color}
                            className={styles.chartLine}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    )
} 