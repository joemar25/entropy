import { writeFile, readFile, mkdir } from 'fs/promises'
import type { DeviceData } from '@/types/device'
import { existsSync } from 'fs'

import path from 'path'

const LOGS_DIR = path.join(process.cwd(), 'data')
const MAX_DATA_POINTS = 60 // Keep last 60 data points (1 minute of data)

// Ensure the data directory exists
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

export async function saveDeviceLog(deviceCode: string, data: DeviceData): Promise<DeviceData> {
    await ensureDataDirectory()

    try {
        const filePath = path.join(LOGS_DIR, `${deviceCode}.json`)

        // Read existing logs or create new ones
        let logs: DeviceData
        try {
            const existingData = await readFile(filePath, 'utf-8')
            logs = JSON.parse(existingData)
        } catch {
            logs = { temperature: [], humidity: [], timestamp: [] }
        }

        // Add new data
        logs.temperature = [...logs.temperature, ...data.temperature].slice(-MAX_DATA_POINTS)
        logs.humidity = [...logs.humidity, ...data.humidity].slice(-MAX_DATA_POINTS)
        logs.timestamp = [...logs.timestamp, ...data.timestamp].slice(-MAX_DATA_POINTS)

        // Save to file
        await writeFile(filePath, JSON.stringify(logs, null, 2))
        return logs
    } catch (error) {
        console.error('Error saving device log:', error)
        // Return the current data point if file operations fail
        return {
            temperature: data.temperature,
            humidity: data.humidity,
            timestamp: data.timestamp
        }
    }
}

export async function getDeviceLogs(deviceCode: string): Promise<DeviceData> {
    await ensureDataDirectory()

    try {
        const filePath = path.join(LOGS_DIR, `${deviceCode}.json`)
        const data = await readFile(filePath, 'utf-8')
        return JSON.parse(data)
    } catch {
        // Return empty arrays if file doesn't exist or can't be read
        return { temperature: [], humidity: [], timestamp: [] }
    }
} 