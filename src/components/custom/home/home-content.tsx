'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';

const HomeContent = () => {
    return (
        <div className="space-y-6 p-6">
            <h2 className="text-xl font-semibold text-center">Enter IoT Device Code</h2>
            <p className="text-center text-gray-600">
                Access your IoT device charts by entering the device code below.
            </p>
            <div className="flex items-center space-x-4 justify-center">
                <Input placeholder="Enter device code" className="w-full max-w-md" />
                <HoverBorderGradient as="button" duration={1} className="text-white">
                    Submit
                </HoverBorderGradient>
            </div>
        </div>
    );
};

export default HomeContent;
