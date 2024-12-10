'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface DeviceCodeStore {
    deviceCode: string | null
    setDeviceCode: (code: string | null) => void
    clearDeviceCode: () => void
    isAuthenticated: boolean
}

export const useDeviceCode = create<DeviceCodeStore>()(
    persist(
        (set) => ({
            deviceCode: null,
            isAuthenticated: false,
            setDeviceCode: (code) => set({
                deviceCode: code,
                isAuthenticated: Boolean(code)
            }),
            clearDeviceCode: () => set({
                deviceCode: null,
                isAuthenticated: false
            }),
        }),
        {
            name: 'device-code-storage',
        }
    )
) 