'use client'

import { ReactNode } from 'react'
import Navbar from './Navbar'

export default function LayoutInterno({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-blue-50">
            <Navbar />
            <main className="flex-grow p-4">{children}</main>
        </div>
    )
}
