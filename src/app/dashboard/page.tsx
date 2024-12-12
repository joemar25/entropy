'use client'

import type { ChartDataPoint, DeviceData } from '@/types/device'

import { toast } from 'sonner'
import { AlertTriangle, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { formatDateTime } from '@/utils/date'
import { Button } from '@/components/ui/button'
import { DashboardChart } from '@/components/custom/dashboard/chart'
import { useDeviceCode } from '@/hooks/device/use-device-code'
import { useDeviceData } from '@/hooks/device/use-device-data'
import { MetricsGrid } from '@/components/custom/dashboard/metrics-grid'
import { DashboardBarChart } from '@/components/custom/dashboard/bar-chart'
import { DashboardAreaChart } from '@/components/custom/dashboard/area-chart'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"

type Warning = {
    title: string
    message: string
    timestamp: string
}

export default function Dashboard() {
    const router = useRouter()
    const { deviceCode } = useDeviceCode()
    const { data, isLoading, error, refreshData } = useDeviceData()
    const [chartData, setChartData] = useState<ChartDataPoint[]>([])
    const [showWarnings, setShowWarnings] = useState(true)
    const [warningHistory, setWarningHistory] = useState<Warning[]>([])

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

                // Process warnings
                const currentWarnings = getWarnings(data)
                if (currentWarnings.length > 0) {
                    const newWarnings = currentWarnings.map(warning => ({
                        ...warning,
                        timestamp: new Date().toISOString()
                    }))

                    setWarningHistory(prev => {
                        const combined = [...prev, ...newWarnings]
                        // Keep last 24 hours of warnings
                        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
                        return combined.filter(w => new Date(w.timestamp) > twentyFourHoursAgo)
                    })
                }
            } catch (error) {
                console.error('Error processing data:', error)
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

    const getWarnings = (data: DeviceData): Array<{ title: string; message: string }> => {
        const thresholds = {
            temperature: { low: 22, high: 28, unit: '°C' },
            humidity: { low: 40, high: 60, unit: '%' },
            pm25: { low: 12, high: 35, unit: 'µg/m³' },
            voc: { low: 250, high: 2000, unit: 'ppb' },
            o3: { low: 50, high: 100, unit: 'ppb' },
            co: { low: 4, high: 9, unit: 'ppm' },
            co2: { low: 800, high: 1500, unit: 'ppm' },
            no2: { low: 53, high: 100, unit: 'ppb' },
            so2: { low: 35, high: 75, unit: 'ppb' }
        }

        const warnings: Array<{ title: string; message: string }> = []

        Object.entries(thresholds).forEach(([key, threshold]) => {
            const values = data[key as keyof DeviceData]
            if (Array.isArray(values) && values.length > 0) {
                const latestValue = Number(values[values.length - 1])

                // Skip if not a valid number
                if (isNaN(latestValue)) return

                if (latestValue > threshold.high) {
                    warnings.push({
                        title: `High ${key.toUpperCase()}`,
                        message: `Current: ${latestValue.toFixed(1)}${threshold.unit} (Threshold: ${threshold.high}${threshold.unit})`
                    })
                } else if (latestValue < threshold.low) {
                    warnings.push({
                        title: `Low ${key.toUpperCase()}`,
                        message: `Current: ${latestValue.toFixed(1)}${threshold.unit} (Threshold: ${threshold.low}${threshold.unit})`
                    })
                }
            }
        })

        return warnings
    }

    const WarningsPanel = () => {
        const currentWarnings = data ? getWarnings(data) : []
        const hasWarnings = currentWarnings.length > 0

        if (!hasWarnings && warningHistory.length === 0) return null

        return (
            <div className="space-y-2 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        <h2 className="font-semibold">Warnings</h2>
                        {hasWarnings && (
                            <Badge variant="destructive">
                                {currentWarnings.length} Active
                            </Badge>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowWarnings(!showWarnings)}
                        >
                            {showWarnings ? (
                                <ChevronUp className="h-4 w-4" />
                            ) : (
                                <ChevronDown className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </div>

                {showWarnings && (
                    <div className="space-y-4">
                        {/* Current Warnings */}
                        {hasWarnings && (
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium">Active Warnings</h3>
                                {currentWarnings.map((warning, index) => (
                                    <Alert variant="destructive" key={`current-${index}`}>
                                        <AlertTriangle className="h-4 w-4" />
                                        <AlertTitle>{warning.title}</AlertTitle>
                                        <AlertDescription>
                                            {warning.message}
                                        </AlertDescription>
                                    </Alert>
                                ))}
                            </div>
                        )}

                        {/* Warning History */}
                        {warningHistory.length > 0 && (
                            <div className="space-y-2">
                                <h3 className="text-sm font-medium">Warning History (24h)</h3>
                                <ScrollArea className="h-[200px] rounded-md border">
                                    <div className="space-y-2 p-4">
                                        {warningHistory.map((warning, index) => (
                                            <div
                                                key={`history-${index}`}
                                                className="flex items-start justify-between rounded-lg border p-2 text-sm"
                                            >
                                                <div>
                                                    <p className="font-medium">{warning.title}</p>
                                                    <p className="text-muted-foreground">
                                                        {warning.message}
                                                    </p>
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    {formatDateTime(warning.timestamp)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </div>
                        )}
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className='space-y-6 p-8'>
            {data && (
                <div className='space-y-6'>
                    <WarningsPanel />
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