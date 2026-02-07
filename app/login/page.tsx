"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth.store"

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
    CardDescription,
    CardAction,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const user = useAuthStore((s) => s.user)
    const login = useAuthStore((s) => s.login)
    const router = useRouter()

    // 🔁 Kalau sudah login, langsung ke home
    useEffect(() => {
        if (user) router.replace("/")
    }, [user, router])

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()

        if (!username.trim() || !password.trim()) return

        // 🔐 mocked auth → hanya pakai username
        login(username)
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your username and password to continue
                    </CardDescription>
                    <CardAction>
                        <Button variant="link" type="button">
                            Sign Up
                        </Button>
                    </CardAction>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleLogin}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    placeholder="your_username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <span className="ml-auto text-sm text-muted-foreground">
                                        Mocked
                                    </span>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>

                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full" onClick={handleLogin}>
                        Login
                    </Button>

                    <Button
                        variant="outline"
                        className="w-full"
                        type="button"
                        disabled
                    >
                        Login with Google
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
