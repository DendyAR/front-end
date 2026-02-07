"use client"

import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/auth.store"
import { useQuestionStore } from "@/store/question.store"

export function DevResetButton() {
    if (process.env.NODE_ENV !== "development") return null

    const resetAuth = useAuthStore((s) => s.reset)
    const resetQuestions = useQuestionStore((s) => s.reset)

    const handleReset = () => {
        localStorage.removeItem("auth-storage")
        localStorage.removeItem("question-storage")

        resetAuth()
        resetQuestions()

        // optional: hard refresh biar benar-benar clean
        window.location.reload()
    }

    return (
        <Button
            variant="destructive"
            size="sm"
            onClick={handleReset}
        >
            Reset Storage (Dev)
        </Button>
    )
}
