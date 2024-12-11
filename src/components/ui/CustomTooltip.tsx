import { TooltipProps } from 'recharts'
import { styles } from '@/utils/styles'
import { metrics } from '@/constants/metric'

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

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
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

export default CustomTooltip 