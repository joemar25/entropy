'use client'

import { Input } from '@/components/ui/input'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'
import { useDeviceCodeSubmission } from '@/hooks/device/use-device-code-submission'

const HomeContent = () => {
    const { deviceCode, setDeviceCode, isLoading, handleSubmit } = useDeviceCodeSubmission()

    return (
        <div className='h-screen w-screen flex items-center justify-center'>
            <div className='space-y-6 w-full max-w-lg px-4'>
                <h2 className='text-xl font-semibold text-center'>Enter IoT Device Code</h2>
                <p className='text-center text-muted-foreground'>
                    Access your IoT device charts by entering the device code below.
                </p>
                <form onSubmit={handleSubmit} className='flex flex-col md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0'>
                    <Input
                        placeholder='Enter device code'
                        value={deviceCode}
                        onChange={(e) => setDeviceCode(e.target.value)}
                        aria-label='Device code'
                        className='w-full'
                    />
                    <HoverBorderGradient
                        as='button'
                        duration={1}
                        className='w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed'
                        {...{ type: 'submit', disabled: isLoading }}
                    >
                        {isLoading ? 'Verifying...' : 'Access Dashboard'}
                    </HoverBorderGradient>
                </form>
            </div>
        </div>
    )
}

export default HomeContent