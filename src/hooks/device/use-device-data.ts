'use client'

import { useState, useEffect, useCallback } from 'react'
import { useDeviceCode } from './use-device-code'
import { toast } from 'sonner'
import type { DeviceData } from '@/types/device'

export const useDeviceData = () => {
    const { deviceCode, isAuthenticated } = useDeviceCode()
    const [data, setData] = useState<DeviceData | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

    const fetchData = useCallback(async () => {
        if (!deviceCode || !isAuthenticated) {
            setIsLoading(false)
            return
        }

        try {
            const response = await fetch(`/api/device/${deviceCode}/data`, {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to fetch device data')
            }

            const deviceData = await response.json()

            // Validate the data structure
            if (!deviceData.temperature || !deviceData.humidity || !deviceData.timestamp) {
                throw new Error('Invalid data format received')
            }

            setData(deviceData)
            setLastUpdated(new Date())
            setError(null)
        } catch (err) {
            console.error('Error fetching device data:', err)
            setError(err instanceof Error ? err.message : 'Failed to fetch device data')
            toast.error('Failed to fetch device data')
        } finally {
            setIsLoading(false)
        }
    }, [deviceCode, isAuthenticated])

    // Initial fetch and polling setup
    useEffect(() => {
        if (!isAuthenticated || !deviceCode) {
            setIsLoading(false)
            return
        }

        // Initial fetch
        fetchData()

        // Setup polling interval (every 1 second)
        const interval = setInterval(fetchData, 1000)

        // Cleanup
        return () => {
            clearInterval(interval)
        }
    }, [deviceCode, isAuthenticated, fetchData])

    const refreshData = useCallback(() => {
        setIsLoading(true)
        fetchData()
    }, [fetchData])

    return {
        data,
        isLoading,
        error,
        lastUpdated,
        refreshData
    }
}