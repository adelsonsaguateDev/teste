'use client'

import NavbarMobileDrawer from '@/components/Layout/NavbarMobileDrawer'

export default function LayoutInterno({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen w-full bg-blue-50 overflow-x-hidden">
            <NavbarMobileDrawer />
            <main className="relative z-10 w-full">{children}</main>
        </div>
    )
}

