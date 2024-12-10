'use client'

import type { ChartDataPoint, DeviceData } from '@/types/device'

import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { formatDateTime } from '@/utils/date'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useDeviceCode } from '@/hooks/device/use-device-code'
import { useDeviceData } from '@/hooks/device/use-device-data'
import { LogOut, RefreshCw, Thermometer, Droplets } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

export default function Dashboard() {
    const router = useRouter()
    const { deviceCode, clearDeviceCode } = useDeviceCode()
    const { data, isLoading, error, lastUpdated, refreshData } = useDeviceData()
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
            let filteredData = [...data.temperature.map((temp, index) => ({
                temperature: temp,
                humidity: data.humidity[index],
                timestamp: data.timestamp[index]
            }))]

            // Apply time filter
            if (timeFilter !== 'all') {
                const limit = parseInt(timeFilter)
                filteredData = filteredData.slice(-limit)
            }

            const newChartData = filteredData.map(point => ({
                time: formatDateTime(point.timestamp),
                temperature: point.temperature,
                humidity: point.humidity
            }))
            setChartData(newChartData)
        }
    }, [data, timeFilter])

    const handleLogout = () => {
        clearDeviceCode()
        toast.success('Successfully logged out')
        router.push('/')
    }

    const handleRefresh = () => {
        refreshData()
        toast.success('Refreshing device data...')
    }

    if (!deviceCode || isLoading) return null
    if (error) {
        toast.error(error)
        return null
    }

    const getStatusBadge = (value: number, type: 'temperature' | 'humidity') => {
        if (type === 'temperature') {
            if (value > 28) return <Badge variant={'destructive'}>High</Badge>
            if (value < 22) return <Badge variant={'default'}>Low</Badge>
            return <Badge variant={'secondary'}>Normal</Badge>
        } else {
            if (value > 60) return <Badge variant={'destructive'}>High</Badge>
            if (value < 40) return <Badge variant={'default'}>Low</Badge>
            return <Badge variant={'secondary'}>Normal</Badge>
        }
    }

    const getCurrentValue = (data: DeviceData | null, key: 'temperature' | 'humidity'): number => {
        if (!data || !data[key].length) return 0
        return data[key][data[key].length - 1]
    }

    return (
        <div className='space-y-6 p-8'>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>Device Dashboard</h1>
                <div className='flex gap-2'>
                    <Button
                        variant={'outline'}
                        onClick={handleRefresh}
                        className='gap-2'
                        disabled={isLoading}
                    >
                        <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                    <Button
                        variant={'outline'}
                        onClick={handleLogout}
                        className='gap-2'
                    >
                        <LogOut className='w-4 h-4' />
                        Exit
                    </Button>
                </div>
            </div>

            <div className='grid gap-4'>
                <div className='flex justify-between items-center'>
                    <p>Monitoring device: {deviceCode}</p>
                    {lastUpdated && (
                        <p className='text-sm text-muted-foreground'>
                            Last updated: {formatDateTime(lastUpdated.toISOString())}
                        </p>
                    )}
                </div>

                {data && (
                    <>
                        <div className='grid grid-cols-2 gap-4'>
                            <Card>
                                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                    <CardTitle className='text-sm font-medium'>
                                        Temperature
                                    </CardTitle>
                                    <Thermometer className='h-4 w-4 text-muted-foreground' />
                                </CardHeader>
                                <CardContent>
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <div className='text-2xl font-bold'>
                                                {getCurrentValue(data, 'temperature').toFixed(1)}°C
                                            </div>
                                            <p className='text-xs text-muted-foreground'>
                                                Last reading
                                            </p>
                                        </div>
                                        {getStatusBadge(getCurrentValue(data, 'temperature'), 'temperature')}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                    <CardTitle className='text-sm font-medium'>
                                        Humidity
                                    </CardTitle>
                                    <Droplets className='h-4 w-4 text-muted-foreground' />
                                </CardHeader>
                                <CardContent>
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <div className='text-2xl font-bold'>
                                                {getCurrentValue(data, 'humidity').toFixed(1)}%
                                            </div>
                                            <p className='text-xs text-muted-foreground'>
                                                Last reading
                                            </p>
                                        </div>
                                        {getStatusBadge(getCurrentValue(data, 'humidity'), 'humidity')}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader className='flex flex-row items-center justify-between'>
                                <CardTitle>Real-time Monitoring</CardTitle>
                                <Select
                                    value={timeFilter}
                                    onValueChange={setTimeFilter}
                                >
                                    <SelectTrigger className='w-[180px]'>
                                        <SelectValue placeholder='Select time range' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {timeFilters.map((filter) => (
                                            <SelectItem key={filter.value} value={filter.value}>
                                                {filter.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </CardHeader>
                            <CardContent>
                                <div className='h-[300px]'>
                                    <ResponsiveContainer width='100%' height='100%'>
                                        <LineChart data={chartData}>
                                            <XAxis
                                                dataKey='time'
                                                stroke='#888888'
                                                fontSize={12}
                                            />
                                            <YAxis
                                                stroke='#888888'
                                                fontSize={12}
                                                tickFormatter={(value) => `${value}°C`}
                                            />
                                            <Tooltip />
                                            <Line
                                                type='monotone'
                                                dataKey='temperature'
                                                stroke='#06b6d4'
                                                strokeWidth={2}
                                                dot={false}
                                                animationDuration={500}
                                            />
                                            <Line
                                                type='monotone'
                                                dataKey='humidity'
                                                stroke='#8b5cf6'
                                                strokeWidth={2}
                                                dot={false}
                                                animationDuration={500}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>
        </div>
    )
} 