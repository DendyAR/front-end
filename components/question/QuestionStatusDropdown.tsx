"use client"

import { useAuthStore } from "@/store/auth.store"
import { useQuestionStore } from "@/store/question.store"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Badge } from "@/components/ui/badge"
import { QuestionStatus } from "@/types/question"

const STATUS_LABEL: Record<QuestionStatus, string> = {
    open: "Open",
    answered: "Answered",
    closed: "Closed",
}

export function QuestionStatusDropdown({
    questionId,
    status,
    authorId,
}: {
    questionId: string
    status: QuestionStatus
    authorId: string
}) {
    const user = useAuthStore((s) => s.user)
    const updateQuestion = useQuestionStore((s) => s.updateQuestion)

    const isOwner = user?.id === authorId

    // 🔒 Non-owner → read-only
    if (!isOwner) {
        return (
            <Badge variant="outline">
                {STATUS_LABEL[status]}
            </Badge>
        )
    }

    return (
        <Select
            value={status}
            onValueChange={(value) => {
                if (!user) return
                updateQuestion(
                    questionId,
                    { status: value as QuestionStatus },
                    user.id
                )
            }}
        >
            <SelectTrigger className="w-[160px]">
                <SelectValue />
            </SelectTrigger>

            <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="answered">Answered</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
        </Select>
    )
}
