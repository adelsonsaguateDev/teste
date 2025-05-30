'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { LogOut } from 'lucide-react'

export default function Navbar() {
    const pathname = usePathname()
    const router = useRouter()
    const { logout, codigo } = useAuth()

    const links = [
        { href: '/home', label: 'Início' },
        { href: '/mapa', label: 'Mapa' },
        { href: '/detalhes', label: 'Detalhes do Exame' },
    ]

    const isActive = (href: string) =>
        pathname === href ? 'text-blue-700 font-bold' : 'text-gray-600 hover:text-blue-600'

    return (
        <nav className="w-full bg-white shadow px-4 py-3 flex justify-between items-center">
            <div className="text-lg font-bold text-blue-800">Portal do Candidato</div>

            <div className="flex items-center space-x-4">
                {links.map((link) => (
                    <Link key={link.href} href={link.href} className={`text-sm ${isActive(link.href)}`}>
                        {link.label}
                    </Link>
                ))}

                <span className="text-sm text-gray-400 hidden sm:inline">| {codigo}</span>

                <button
                    onClick={() => {
                        logout()
                        router.push('/')
                    }}
                    className="text-red-600 hover:text-red-800 flex items-center text-sm"
                >
                    <LogOut className="w-4 h-4 mr-1" />
                    Sair
                </button>
            </div>
        </nav>
    )
}
