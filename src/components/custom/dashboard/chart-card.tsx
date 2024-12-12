import { styles } from '@/utils/styles'
import { Button } from '@/components/ui/button'
import { RefreshCw, Maximize2, Minimize2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ChartCardProps {
    title: string
    dataLength: number
    isExpanded: boolean
    onToggleExpand: () => void
    onRefresh?: () => void
    children: React.ReactNode
}

const ChartCard: React.FC<ChartCardProps> = ({
    title,
    dataLength,
    isExpanded,
    onToggleExpand,
    onRefresh,
    children
}) => {
    return (
        <Card className={isExpanded ? styles.expandedCard : ''}>
            <CardHeader className='flex flex-row items-center justify-between'>
                <div>
                    <CardTitle>{title}</CardTitle>
                    <p className='text-sm text-muted-foreground mt-1'>
                        {dataLength} data points displayed
                    </p>
                </div>
                <div className='flex items-center gap-2'>
                    {onRefresh && (
                        <Button
                            variant='outline'
                            size='icon'
                            onClick={onRefresh}
                        >
                            <RefreshCw className='h-4 w-4' />
                        </Button>
                    )}
                    <Button
                        variant='outline'
                        size='icon'
                        onClick={onToggleExpand}
                    >
                        {isExpanded ? (
                            <Minimize2 className='h-4 w-4' />
                        ) : (
                            <Maximize2 className='h-4 w-4' />
                        )}
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className={isExpanded ? styles.expandedChart : styles.chart}>
                    {children}
                </div>
            </CardContent>
        </Card>
    )
}

export default ChartCard 