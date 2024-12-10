'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    TooltipProps,
    ReferenceArea,
    CartesianGrid,
    Legend
} from 'recharts'
import { Button } from '@/components/ui/button'
import { RefreshCw, Maximize2, Minimize2 } from 'lucide-react'
import type { ChartDataPoint } from '@/types/device'
import styles from './chart.module.css'

interface ZoomEvent {
    activeLabel?: string
    dataKey?: string
}

interface ChartProps {
    data: ChartDataPoint[]
    timeFilter: string
    onTimeFilterChangeAction: (value: string) => void
    timeFilters: Array<{ value: string; label: string }>
    onRefresh?: () => void
}

interface CustomTooltipProps extends TooltipProps<number, string> {
    active?: boolean
    payload?: Array<{
        name: string
        value: number
        color: string
        dataKey: string
    }>
    label?: string
}

interface ZoomState {
    left: string | number
    right: string | number
    refAreaLeft: string
    refAreaRight: string
    top: string | number
    bottom: string | number
    animation: boolean
}

const metrics = [
    { key: 'temperature', color: '#06b6d4', name: 'Temperature (°C)', dotClass: styles['tooltipDot--temperature'] },
    { key: 'humidity', color: '#8b5cf6', name: 'Humidity (%)', dotClass: styles['tooltipDot--humidity'] },
    { key: 'pm25', color: '#ef4444', name: 'PM2.5 (µg/m³)', dotClass: styles['tooltipDot--pm25'] },
    { key: 'voc', color: '#f59e0b', name: 'VOC (ppb)', dotClass: styles['tooltipDot--voc'] },
    { key: 'o3', color: '#10b981', name: 'O₃ (ppb)', dotClass: styles['tooltipDot--o3'] },
    { key: 'co', color: '#6366f1', name: 'CO (ppm)', dotClass: styles['tooltipDot--co'] },
    { key: 'co2', color: '#ec4899', name: 'CO₂ (ppm)', dotClass: styles['tooltipDot--co2'] },
    { key: 'no2', color: '#14b8a6', name: 'NO₂ (ppb)', dotClass: styles['tooltipDot--no2'] },
    { key: 'so2', color: '#f97316', name: 'SO₂ (ppb)', dotClass: styles['tooltipDot--so2'] }
] as const

export function DashboardChart({
    data,
    timeFilter,
    onTimeFilterChangeAction,
    timeFilters,
    onRefresh,
}: ChartProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [highlightedMetric] = useState<string | null>(null)
    const [zoomState, setZoomState] = useState<ZoomState>({
        left: 'dataMin',
        right: 'dataMax',
        refAreaLeft: '',
        refAreaRight: '',
        top: 'dataMax',
        bottom: 'dataMin',
        animation: true
    })

    const handleZoomStart = useCallback((event: ZoomEvent) => {
        const label = event?.activeLabel
        if (!label) return

        setZoomState(prev => ({
            ...prev,
            refAreaLeft: label
        }))
    }, [])

    const handleZoomMove = useCallback((event: ZoomEvent) => {
        const label = event?.activeLabel
        if (!label || !zoomState.refAreaLeft) return

        setZoomState(prev => ({
            ...prev,
            refAreaRight: label
        }))
    }, [zoomState.refAreaLeft])

    const handleZoomEnd = useCallback(() => {
        if (!zoomState.refAreaLeft || !zoomState.refAreaRight) {
            return
        }

        const left = zoomState.refAreaLeft
        const right = zoomState.refAreaRight

        setZoomState(prev => ({
            ...prev,
            refAreaLeft: '',
            refAreaRight: '',
            left: left > right ? right : left,
            right: left > right ? left : right
        }))
    }, [zoomState])

    const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
        if (!active || !payload || !payload.length || !label) {
            return null
        }

        return (
            <div className={styles.tooltipContainer}>
                <div className={styles.tooltipGrid}>
                    <div className={styles.tooltipLabel}>
                        {label}
                    </div>
                    {payload.map((entry, index) => {
                        const metric = metrics.find(m => m.key === entry.dataKey)
                        if (!metric) return null

                        return (
                            <div
                                key={`item-${index}`}
                                className={styles.tooltipEntry}
                            >
                                <span className={styles.tooltipMetricName}>
                                    <span className={`${styles.tooltipDot} ${metric.dotClass}`} />
                                    {entry.name}:
                                </span>
                                <span className={styles.tooltipValue}>
                                    {Number(entry.value).toFixed(1)}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        <Card className={isExpanded ? styles.expandedCard : ''}>
            <CardHeader className='flex flex-row items-center justify-between'>
                <div>
                    <CardTitle>Real-time Monitoring</CardTitle>
                    <p className='text-sm text-muted-foreground mt-1'>
                        {data.length} data points displayed
                    </p>
                </div>
                <div className='flex items-center gap-2'>
                    <Select
                        value={timeFilter}
                        onValueChange={onTimeFilterChangeAction}
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
                    {onRefresh && (
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={onRefresh}
                        >
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                    )}
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? (
                            <Minimize2 className="h-4 w-4" />
                        ) : (
                            <Maximize2 className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className={isExpanded ? styles.expandedChart : styles.chart}>
                    {data.length > 0 ? (
                        <ResponsiveContainer width='100%' height='100%'>
                            <LineChart
                                data={data}
                                margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                                onMouseDown={handleZoomStart}
                                onMouseMove={handleZoomMove}
                                onMouseUp={handleZoomEnd}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey='time'
                                    stroke='#888888'
                                    fontSize={12}
                                    angle={-45}
                                    textAnchor="end"
                                    height={70}
                                    interval={0}
                                    tick={{ fill: '#888888' }}
                                    domain={[zoomState.left, zoomState.right]}
                                />
                                <YAxis
                                    yAxisId="left"
                                    orientation="left"
                                    stroke='#888888'
                                    tick={{ fill: '#888888' }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend
                                    verticalAlign="top"
                                    height={36}
                                    wrapperStyle={{
                                        paddingBottom: '20px',
                                        fontSize: '12px'
                                    }}
                                />
                                {metrics.map((metric) => (
                                    <Line
                                        key={metric.key}
                                        type="monotone"
                                        dataKey={metric.key}
                                        name={metric.name}
                                        stroke={metric.color}
                                        yAxisId="left"
                                        dot={false}
                                        strokeWidth={highlightedMetric === metric.key ? 3 : 1.5}
                                        opacity={highlightedMetric ? (highlightedMetric === metric.key ? 1 : 0.3) : 1}
                                        activeDot={{ r: 4, strokeWidth: 0 }}
                                        className={styles.chartLine}
                                    />
                                ))}
                                {zoomState.refAreaLeft && zoomState.refAreaRight && (
                                    <ReferenceArea
                                        yAxisId="left"
                                        x1={zoomState.refAreaLeft}
                                        x2={zoomState.refAreaRight}
                                        strokeOpacity={0.3}
                                    />
                                )}
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-muted-foreground">No data available</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
} 