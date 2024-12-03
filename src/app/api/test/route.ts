import { NextResponse } from 'next/server'

export async function GET() {
    return NextResponse.json(
        { error: 'Test' },
        { status: 500 }
    )
}