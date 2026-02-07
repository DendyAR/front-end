"use client"

import { usePathname } from "next/navigation"
import { AuthGuard } from "@/components/AuthGuard"
import { Navbar } from "@/components/Navbar"

export function AppShell({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const hideNavbar = pathname === "/login"

    return (
        <AuthGuard>
            {!hideNavbar && <Navbar />}
            <main>{children}</main>
        </AuthGuard>
    )
}
