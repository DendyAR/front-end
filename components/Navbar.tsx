"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet"

import { useAuthStore } from "@/store/auth.store"
import { DevResetButton } from "./DevResetButton"
import { ModeToggle } from "./ToogleTheme"

export function Navbar() {
    const user = useAuthStore((s) => s.user)
    const logout = useAuthStore((s) => s.logout)
    const router = useRouter()

    const handleLogout = () => {
        logout()
        router.replace("/login")
    }

    return (
        <header className="border-b">
            <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-lg font-bold">
                    QnA App
                </Link>

                {/* ================= DESKTOP ================= */}
                <div className="hidden md:flex items-center gap-3">
                    {user ? (
                        <>
                            <Link href="/ask">
                                <Button size="sm">Ask Question</Button>
                            </Link>

                            {process.env.NODE_ENV === "development" && (
                                <DevResetButton />
                            )}

                            <span className="text-sm text-muted-foreground">
                                {user.username}
                            </span>

                            <ModeToggle />

                            <Button
                                size="sm"
                                variant="outline"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Link href="/login">
                            <Button size="sm" variant="outline">
                                Login
                            </Button>
                        </Link>
                    )}
                </div>

                {/* ================= MOBILE ================= */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline"><MenuIcon /></Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Edit profile</SheetTitle>
                                <SheetDescription>
                                    Make changes to your profile here. Click save when you&apos;re done.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                {user ? (
                                    <>
                                        <span className="text-sm text-muted-foreground">
                                            Logged in as <b>{user.username}</b>
                                        </span>

                                        <Link href="/ask">
                                            <Button className="w-full">
                                                Ask Question
                                            </Button>
                                        </Link>

                                        {process.env.NODE_ENV === "development" && (
                                            <DevResetButton />
                                        )}

                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </Button>
                                    </>
                                ) : (
                                    <Link href="/login">
                                        <Button className="w-full" variant="outline">
                                            Login
                                        </Button>
                                    </Link>
                                )}
                            </div>

                        </SheetContent>
                    </Sheet>
                </div>

            </div>
        </header>
    )
}
