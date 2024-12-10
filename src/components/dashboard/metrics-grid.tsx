'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Thermometer, Droplets, Wind } from 'lucide-react'
import type { DeviceData } from '@/types/device'

type MetricType = 'temperature' | 'humidity' | 'pm25' | 'voc' | 'o3' | 'co' | 'co2' | 'no2' | 'so2'

interface MetricsGridProps {
    data: DeviceData
    getCurrentValueAction: (data: DeviceData, key: keyof DeviceData) => number
    getStatusBadgeAction: (value: number, type: MetricType) => JSX.Element
}

export function MetricsGrid({
    data,
    getCurrentValueAction,
    getStatusBadgeAction
}: MetricsGridProps) {
    const metrics: Array<{
        key: MetricType
        label: string
        unit: string
        icon: typeof Wind
    }> = [
            { key: 'temperature', label: 'Temperature', unit: '°C', icon: Thermometer },
            { key: 'humidity', label: 'Humidity', unit: '%', icon: Droplets },
            { key: 'pm25', label: 'PM2.5', unit: 'µg/m³', icon: Wind },
            { key: 'voc', label: 'VOC', unit: 'ppb', icon: Wind },
            { key: 'o3', label: 'O3', unit: 'ppb', icon: Wind },
            { key: 'co', label: 'CO', unit: 'ppm', icon: Wind },
            { key: 'co2', label: 'CO2', unit: 'ppm', icon: Wind },
            { key: 'no2', label: 'NO2', unit: 'ppb', icon: Wind },
            { key: 'so2', label: 'SO2', unit: 'ppb', icon: Wind },
        ]

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {metrics.map(({ key, label, unit, icon: Icon }) => (
                <Card key={key}>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>{label}</CardTitle>
                        <Icon className='h-4 w-4 text-muted-foreground' />
                    </CardHeader>
                    <CardContent>
                        <div className='flex items-center justify-between'>
                            <div>
                                <div className='text-2xl font-bold'>
                                    {getCurrentValueAction(data, key).toFixed(1)} {unit}
                                </div>
                                <p className='text-xs text-muted-foreground'>Last reading</p>
                            </div>
                            {getStatusBadgeAction(getCurrentValueAction(data, key), key)}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
} 