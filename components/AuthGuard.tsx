"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuthStore } from "@/store/auth.store"

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const user = useAuthStore((s) => s.user)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (!user && pathname !== "/login") {
            router.replace("/login")
        }
    }, [user, pathname, router])

    if (!user && pathname !== "/login") return null

    return <>{children}</>
}
