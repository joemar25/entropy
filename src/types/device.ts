export interface DeviceData {
    temperature: number[]
    humidity: number[]
    pm25: number[]
    voc: number[]
    o3: number[]
    co: number[]
    co2: number[]
    no2: number[]
    so2: number[]
    timestamp: string[]
}

export type ChartDataPoint = {
    time: string
    temperature: number
    humidity: number
    pm25: number
    voc: number
    o3: number
    co: number
    co2: number
    no2: number
    so2: number
}

export type DeviceMetric = keyof Omit<DeviceData, 'timestamp'>

export function deviceDataToChartPoints(data: DeviceData): ChartDataPoint[] {
    return data.timestamp.map((time, index) => ({
        time: new Date(time).toLocaleTimeString(),
        temperature: data.temperature[index],
        humidity: data.humidity[index],
        pm25: data.pm25[index],
        voc: data.voc[index],
        o3: data.o3[index],
        co: data.co[index],
        co2: data.co2[index],
        no2: data.no2[index],
        so2: data.so2[index]
    }))
}