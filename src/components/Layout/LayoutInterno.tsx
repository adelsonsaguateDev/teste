'use client'

import NavbarMobileDrawer from '@/components/Layout/NavbarMobileDrawer'

export default function LayoutInterno({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen bg-blue-50">
            <NavbarMobileDrawer />
            <main className="relative z-10">{children}</main>
        </div>
    )
}

