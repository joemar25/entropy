'use client'

import type { ChartDataPoint } from '@/types/device'

import ChartCard from '@/components/ui/ChartCard'
import CustomTooltip from '@/components/ui/CustomTooltip'

import { styles } from '@/utils/styles'
import { metrics } from '@/constants/metric'
import { useState, useCallback } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceArea, CartesianGrid, Legend } from 'recharts'

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

interface ZoomState {
    left: string | number
    right: string | number
    refAreaLeft: string
    refAreaRight: string
    top: string | number
    bottom: string | number
    animation: boolean
}

export function DashboardChart({
    data,
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

    return (
        <ChartCard
            title="Real-time Monitoring"
            dataLength={data.length}
            isExpanded={isExpanded}
            onToggleExpand={() => setIsExpanded(!isExpanded)}
            onRefresh={onRefresh}
        >
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
        </ChartCard>
    )
} 