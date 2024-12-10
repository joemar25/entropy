import { toast } from 'sonner'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export const useDeviceCodeSubmission = () => {
    const [deviceCode, setDeviceCode] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!deviceCode.trim()) {
            toast.error('Please enter a device code')
            return
        }

        setIsLoading(true)
        try {
            const response = await fetch('/api/device/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ deviceCode }),
            })

            const data = await response.json()

            if (response.ok && data.success) {
                toast.success('Device code accepted')
                localStorage.setItem('deviceCode', deviceCode)
                router.push('/dashboard')
            } else {
                toast.error(data.message || 'Invalid device code')
            }
        } catch (error) {
            console.error('Error submitting device code:', error)
            toast.error('Failed to verify device code')
        } finally {
            setIsLoading(false)
        }
    }

    return {
        deviceCode,
        setDeviceCode,
        isLoading,
        handleSubmit,
    }
} 