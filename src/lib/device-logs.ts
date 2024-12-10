import path from 'path'
import type { DeviceData, DeviceMetric } from '@/types/device'
import { existsSync } from 'fs'
import { writeFile, readFile, mkdir } from 'fs/promises'

const LOGS_DIR = path.join(process.cwd(), 'data')
const MAX_DATA_POINTS = 60 // Keep last 60 data points (1 minute of data)

interface ParsedDeviceData {
    [key: string]: unknown[] | undefined
}

async function ensureDataDirectory() {
    if (!existsSync(LOGS_DIR)) {
        try {
            await mkdir(LOGS_DIR, { recursive: true })
        } catch (error) {
            console.error('Error creating data directory:', error)
            throw new Error('Failed to create data directory')
        }
    }
}

function initializeEmptyDeviceData(): DeviceData {
    return {
        temperature: [],
        humidity: [],
        pm25: [],
        voc: [],
        o3: [],
        co: [],
        co2: [],
        no2: [],
        so2: [],
        timestamp: []
    }
}

function parseNumericValue(value: unknown): number {
    if (typeof value === 'number') return value
    if (typeof value === 'string') {
        const parsed = parseFloat(value)
        return isNaN(parsed) ? 0 : parsed
    }
    return 0
}

function parseTimestamp(value: unknown): string {
    if (typeof value === 'string') return value
    if (value instanceof Date) return value.toISOString()
    return new Date().toISOString()
}

export async function saveDeviceLog(deviceCode: string, data: DeviceData): Promise<DeviceData> {
    await ensureDataDirectory()

    try {
        const filePath = path.join(LOGS_DIR, `${deviceCode}.json`)
        const logs: DeviceData = initializeEmptyDeviceData()

        // Read existing logs if they exist
        try {
            const existingData = await readFile(filePath, 'utf-8')
            const parsed = JSON.parse(existingData) as ParsedDeviceData
            if (parsed && typeof parsed === 'object') {
                const numericMetrics: DeviceMetric[] = [
                    'temperature', 'humidity', 'pm25', 'voc',
                    'o3', 'co', 'co2', 'no2', 'so2'
                ]

                numericMetrics.forEach(metric => {
                    if (Array.isArray(parsed[metric])) {
                        logs[metric] = parsed[metric]?.map(parseNumericValue) || []
                    }
                })

                if (Array.isArray(parsed.timestamp)) {
                    logs.timestamp = parsed.timestamp.map(parseTimestamp)
                }
            }
        } catch {
            // Use initialized empty data if file doesn't exist or is invalid
            console.error('No existing data found or invalid file format')
        }

        // Handle numeric metrics
        const numericMetrics: DeviceMetric[] = [
            'temperature', 'humidity', 'pm25', 'voc',
            'o3', 'co', 'co2', 'no2', 'so2'
        ]

        numericMetrics.forEach(metric => {
            if (Array.isArray(data[metric])) {
                logs[metric] = [
                    ...logs[metric],
                    ...data[metric].map(val => parseNumericValue(val))
                ].slice(-MAX_DATA_POINTS)
            }
        })

        // Handle timestamp
        if (Array.isArray(data.timestamp)) {
            logs.timestamp = [
                ...logs.timestamp,
                ...data.timestamp.map(parseTimestamp)
            ].slice(-MAX_DATA_POINTS)
        }

        // Ensure all arrays have the same length
        const maxLength = Math.max(
            ...numericMetrics.map(metric => logs[metric].length),
            logs.timestamp.length
        )

        // Pad arrays if necessary
        numericMetrics.forEach(metric => {
            while (logs[metric].length < maxLength) {
                logs[metric].push(0)
            }
        })

        while (logs.timestamp.length < maxLength) {
            logs.timestamp.push(new Date().toISOString())
        }

        // Save to file
        await writeFile(filePath, JSON.stringify(logs, null, 2))
        return logs
    } catch (error) {
        console.error('Error saving device log:', error)
        throw new Error('Failed to save device log')
    }
}

export async function getDeviceLogs(deviceCode: string): Promise<DeviceData> {
    await ensureDataDirectory()

    try {
        const filePath = path.join(LOGS_DIR, `${deviceCode}.json`)

        if (!existsSync(filePath)) {
            const emptyData = initializeEmptyDeviceData()
            await writeFile(filePath, JSON.stringify(emptyData, null, 2))
            return emptyData
        }

        const data = await readFile(filePath, 'utf-8')
        const parsedData = JSON.parse(data) as ParsedDeviceData

        // Initialize with empty data structure
        const validatedData = initializeEmptyDeviceData()

        // Validate numeric metrics
        const numericMetrics: DeviceMetric[] = [
            'temperature', 'humidity', 'pm25', 'voc',
            'o3', 'co', 'co2', 'no2', 'so2'
        ]

        numericMetrics.forEach(metric => {
            validatedData[metric] = Array.isArray(parsedData[metric])
                ? parsedData[metric]?.map(parseNumericValue) || []
                : []
        })

        // Validate timestamp
        validatedData.timestamp = Array.isArray(parsedData.timestamp)
            ? parsedData.timestamp.map(parseTimestamp)
            : []

        return validatedData
    } catch (error) {
        console.error('Error reading device logs:', error)
        return initializeEmptyDeviceData()
    }
}