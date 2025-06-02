'use client'

import NavbarMobile from '@/components/Layout/NavbarMobileDrawer'

export default function LayoutInterno({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen bg-blue-50">
            <NavbarMobile />
            {/* Removido o pt-4 para permitir que o conteúdo ocupe toda a tela */}
            <main className="relative z-10">{children}</main>
        </div>
    )
}