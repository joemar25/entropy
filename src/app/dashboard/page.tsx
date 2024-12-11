'use client'

import type { ChartDataPoint, DeviceData } from '@/types/device'

import { toast } from 'sonner'
import { RefreshCw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { formatDateTime } from '@/utils/date'
import { Button } from '@/components/ui/button'
import { DashboardChart } from '@/components/dashboard/chart'
import { useDeviceCode } from '@/hooks/device/use-device-code'
import { useDeviceData } from '@/hooks/device/use-device-data'
import { MetricsGrid } from '@/components/dashboard/metrics-grid'
import { DashboardBarChart } from '@/components/dashboard/bar-chart'
import { DashboardAreaChart } from '@/components/dashboard/area-chart'

export default function Dashboard() {
    const router = useRouter()
    const { deviceCode } = useDeviceCode()
    const { data, isLoading, error, refreshData } = useDeviceData()
    const [chartData, setChartData] = useState<ChartDataPoint[]>([])

    const timeFilters = [
        { value: '10', label: 'Last 10 readings' },
        { value: '30', label: 'Last 30 readings' },
        { value: '60', label: 'Last 60 readings' },
        { value: 'all', label: 'All readings' },
    ]

    const [timeFilter, setTimeFilter] = useState('10')

    useEffect(() => {
        if (!deviceCode) {
            router.push('/')
        }
    }, [deviceCode, router])

    useEffect(() => {
        if (data) {
            try {
                let filteredData = [...(data.temperature || []).map((temp, index) => ({
                    temperature: temp,
                    humidity: data.humidity?.[index] || 0,
                    pm25: data.pm25?.[index] || 0,
                    voc: data.voc?.[index] || 0,
                    o3: data.o3?.[index] || 0,
                    co: data.co?.[index] || 0,
                    co2: data.co2?.[index] || 0,
                    no2: data.no2?.[index] || 0,
                    so2: data.so2?.[index] || 0,
                    timestamp: data.timestamp?.[index] || new Date().toISOString()
                }))]

                // Apply time filter
                if (timeFilter !== 'all') {
                    const limit = parseInt(timeFilter)
                    filteredData = filteredData.slice(-limit)
                }

                const newChartData = filteredData.map(point => ({
                    time: formatDateTime(point.timestamp),
                    temperature: Number(point.temperature.toFixed(1)),
                    humidity: Number(point.humidity.toFixed(1)),
                    pm25: Number(point.pm25.toFixed(1)),
                    voc: Number(point.voc.toFixed(1)),
                    o3: Number(point.o3.toFixed(1)),
                    co: Number(point.co.toFixed(1)),
                    co2: Number(point.co2.toFixed(1)),
                    no2: Number(point.no2.toFixed(1)),
                    so2: Number(point.so2.toFixed(1))
                }))
                setChartData(newChartData)
            } catch (error) {
                console.error('Error processing chart data:', error)
                toast.error('Error processing data')
            }
        }
    }, [data, timeFilter])

    if (!deviceCode || isLoading) {
        return <LoadingState />
    }

    if (error) {
        return <ErrorState onRetry={refreshData} />
    }

    const getStatusBadge = (value: number, type: 'temperature' | 'humidity' | 'pm25' | 'voc' | 'o3' | 'co' | 'co2' | 'no2' | 'so2') => {
        const thresholds = {
            temperature: { low: 22, high: 28 },
            humidity: { low: 40, high: 60 },
            pm25: { low: 12, high: 35 }, // EPA standards
            voc: { low: 250, high: 2000 }, // ppb
            o3: { low: 50, high: 100 }, // ppb
            co: { low: 4, high: 9 }, // ppm
            co2: { low: 800, high: 1500 }, // ppm
            no2: { low: 53, high: 100 }, // ppb
            so2: { low: 35, high: 75 }, // ppb
        }

        const threshold = thresholds[type]
        if (value > threshold.high) return <Badge variant={'destructive'}>High</Badge>
        if (value < threshold.low) return <Badge variant={'default'}>Low</Badge>
        return <Badge variant={'secondary'}>Normal</Badge>
    }

    const getCurrentValue = (data: DeviceData | null, key: keyof DeviceData): number => {
        if (!data || !Array.isArray(data[key]) || data[key].length === 0) return 0
        const value = data[key][data[key].length - 1]
        return typeof value === 'number' ? value : 0
    }

    return (
        <div className='space-y-6 p-8'>
            {data && (
                <div className='space-y-6'>
                    <DashboardChart
                        data={chartData}
                        timeFilter={timeFilter}
                        onTimeFilterChangeAction={setTimeFilter}
                        timeFilters={timeFilters}
                        onRefresh={refreshData}
                    />
                    <DashboardBarChart data={chartData} />
                    <DashboardAreaChart data={chartData} />
                    <MetricsGrid
                        data={data}
                        getCurrentValueAction={getCurrentValue}
                        getStatusBadgeAction={getStatusBadge}
                        onRefresh={refreshData}
                    />
                </div>
            )}
        </div>
    )
}

function LoadingState() {
    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='flex flex-col items-center gap-2'>
                <RefreshCw className='w-8 h-8 animate-spin' />
                <p>Loading dashboard...</p>
            </div>
        </div>
    )
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='flex flex-col items-center gap-2 text-destructive'>
                <p>Error loading dashboard data</p>
                <Button onClick={onRetry} variant='outline'>
                    Try Again
                </Button>
            </div>
        </div>
    )
} 