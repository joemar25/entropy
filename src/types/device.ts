export interface DeviceData {
    temperature: number[]
    humidity: number[]
    timestamp: string[]
}

export type ChartDataPoint = {
    time: string
    temperature: number
    humidity: number
}

export function deviceDataToChartPoints(data: DeviceData): ChartDataPoint[] {
    return data.timestamp.map((time, index) => ({
        time: new Date(time).toLocaleTimeString(),
        temperature: data.temperature[index],
        humidity: data.humidity[index]
    }))
}