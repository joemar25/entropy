// src\app\api\device\[deviceCode]\data\route.ts
import { NextResponse } from 'next/server'
import { VALID_DEVICE_CODES } from '@/constants/device'
import type { DeviceData } from '@/types/device'
import { saveDeviceLog } from '@/lib/device-logs'
import { type NextRequest } from 'next/server'

// Helper to generate seeded random number
const seededRandom = (seed: string): number => {
    const hash = seed.split('').reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc)
    }, 0)
    return Math.abs(Math.sin(hash))
}

// Generate device data
const generateDeviceData = (deviceCode: string): DeviceData => {
    try {
        const baseTemp = 20 + seededRandom(deviceCode) * 5
        const baseHumidity = 30 + seededRandom(deviceCode + '_humidity') * 20
        const temp = baseTemp + (Math.random() * 2 - 1)
        const humidity = baseHumidity + (Math.random() * 4 - 2)
        const timestamp = new Date().toISOString()

        return {
            temperature: [temp],
            humidity: [humidity],
            timestamp: [timestamp]
        }
    } catch (error) {
        console.error('Error generating device data:', error)
        throw new Error('Failed to generate device data')
    }
}

export async function GET(request: NextRequest) {
    try {
        // Get deviceCode from URL
        const url = new URL(request.url)
        const deviceCode = url.pathname.split('/')[3] // Get deviceCode from path

        // Validate device code
        if (!deviceCode || typeof deviceCode !== 'string') {
            return NextResponse.json(
                { error: 'Device code is required' },
                { status: 400 }
            )
        }

        if (!VALID_DEVICE_CODES.includes(deviceCode)) {
            return NextResponse.json(
                { error: 'Invalid device code' },
                { status: 401 }
            )
        }

        // Generate new data
        const newData = generateDeviceData(deviceCode)

        try {
            // Save and get updated logs
            const logs = await saveDeviceLog(deviceCode, newData)
            return new NextResponse(JSON.stringify(logs), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store, must-revalidate',
                    'Pragma': 'no-cache'
                }
            })
        } catch (error) {
            // If file operations fail, return just the current data point
            console.error('Error saving logs, returning current data:', error)
            return new NextResponse(JSON.stringify(newData), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store, must-revalidate',
                    'Pragma': 'no-cache'
                }
            })
        }
    } catch (error) {
        console.error('Error handling device data:', error)
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Internal server error' },
            { status: 500 }
        )
    }
}