'use client'

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'
import type { ChartDataPoint } from '@/types/device'

interface AreaChartProps {
    data: ChartDataPoint[]
}

export function DashboardAreaChart({ data }: AreaChartProps) {
    return (
        <ResponsiveContainer width='100%' height={300}>
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="temperature" stroke="#06b6d4" fill="#06b6d4" />
                <Area type="monotone" dataKey="humidity" stroke="#8b5cf6" fill="#8b5cf6" />
                <Area type="monotone" dataKey="pm25" stroke="#ef4444" fill="#ef4444" />
                <Area type="monotone" dataKey="voc" stroke="#f59e0b" fill="#f59e0b" />
                <Area type="monotone" dataKey="o3" stroke="#10b981" fill="#10b981" />
                <Area type="monotone" dataKey="co" stroke="#06b6d4" fill="#06b6d4" />
                <Area type="monotone" dataKey="co2" stroke="#8b5cf6" fill="#8b5cf6" />
                <Area type="monotone" dataKey="no2" stroke="#ef4444" fill="#ef4444" />
            </AreaChart>
        </ResponsiveContainer>
    )
} 