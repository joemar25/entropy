import { NextResponse } from 'next/server'

// This would typically be replaced with a database query
const VALID_DEVICE_CODES = ['demo', 'demo123', 'test', 'test456', 'device', 'device789']

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { deviceCode } = body

        if (!deviceCode) {
            return NextResponse.json(
                { error: 'Device code is required' },
                { status: 400 }
            )
        }

        // Simulate database lookup delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        const isValid = VALID_DEVICE_CODES.includes(deviceCode)

        if (isValid) {
            return NextResponse.json(
                {
                    success: true,
                    message: 'Device code validated successfully',
                    deviceCode
                },
                { status: 200 }
            )
        }

        return NextResponse.json(
            {
                success: false,
                message: 'Invalid device code'
            },
            { status: 401 }
        )

    } catch (error) {
        console.error('Error validating device code:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}