"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth.store"
import { useQuestionStore } from "@/store/question.store"

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function AskQuestionPage() {
    const user = useAuthStore((s) => s.user)
    const addQuestion = useQuestionStore((s) => s.addQuestion)
    const router = useRouter()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [submitting, setSubmitting] = useState(false)

    // 🔐 Safety guard (double protection)
    useEffect(() => {
        if (!user) {
            router.replace("/login")
        }
    }, [user, router])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!user || !title.trim() || !description.trim()) return

        setSubmitting(true)

        addQuestion({
            title: title.trim(),
            description: description.trim(),
            status: "open",
            authorId: user.id,
        })

        router.push("/")
    }

    if (!user) return null

    return (
        <div className="max-w-2xl mx-auto p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Ask a Question</CardTitle>
                    <CardDescription>
                        Share your problem clearly so others can help you.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            placeholder="Question title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={submitting}
                        />

                        <Textarea
                            placeholder="Describe your problem in detail..."
                            rows={6}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={submitting}
                        />

                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                disabled={
                                    submitting ||
                                    !title.trim() ||
                                    !description.trim()
                                }
                            >
                                Post Question
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
