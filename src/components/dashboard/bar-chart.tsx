'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'
import type { ChartDataPoint } from '@/types/device'

interface BarChartProps {
    data: ChartDataPoint[]
}

export function DashboardBarChart({ data }: BarChartProps) {
    return (
        <ResponsiveContainer width='100%' height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="temperature" fill="#06b6d4" />
                <Bar dataKey="humidity" fill="#8b5cf6" />
                <Bar dataKey="pm25" fill="#ef4444" />
                <Bar dataKey="voc" fill="#f59e0b" />
                <Bar dataKey="o3" fill="#10b981" />
                <Bar dataKey="co" fill="#06b6d4" />
                <Bar dataKey="co2" fill="#8b5cf6" />
                <Bar dataKey="no2" fill="#ef4444" />
            </BarChart>
        </ResponsiveContainer>
    )
} 