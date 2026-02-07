"use client"

import { useParams } from "next/navigation"
import { useState } from "react"

import { useQuestionStore } from "@/store/question.store"
import { useAuthStore } from "@/store/auth.store"

import { CommentItem } from "@/components/question/CommentItem"
import { CommentForm } from "@/components/question/CommentForm"

import { EditQuestionForm } from "@/components/question/EditQuestionForm"
import { Button } from "@/components/ui/button"
import { QuestionStatusDropdown } from "@/components/question/QuestionStatusDropdown"

export default function QuestionDetailPage() {
    const params = useParams()
    const questionId = params.id as string

    const user = useAuthStore((s) => s.user)
    const {
        questions,
        addComment,
        updateComment,
        updateQuestion,
    } = useQuestionStore()

    const question = questions.find((q) => q.id === questionId)
    if (!question) {
        return <p className="p-6 text-muted-foreground">Question not found</p>
    }

    const isOwner = user?.id === question.authorId
    const [editing, setEditing] = useState(false)

    console.log({
        userId: user?.id,
        questionAuthorId: question.authorId,
    })


    return (
        <div className="max-w-3xl mx-auto p-6 space-y-8">
            {/* ===== Question Header ===== */}
            <div className="space-y-3">
                {editing ? (
                    <EditQuestionForm
                        question={question}
                        onSave={(data) => {
                            if (!user) return
                            updateQuestion(question.id, data, user.id)
                            setEditing(false)
                        }}
                        onCancel={() => setEditing(false)}
                    />
                ) : (
                    <>
                        <h1 className="text-2xl font-bold">
                            {question.title}
                        </h1>

                        <p className="text-muted-foreground">
                            {question.description}
                        </p>

                        <div className="flex items-center gap-3">
                            {/* Status (owner editable) */}
                            <QuestionStatusDropdown
                                questionId={question.id}
                                status={question.status}
                                authorId={question.authorId}
                            />

                            {isOwner && (
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setEditing(true)}
                                >
                                    Edit
                                </Button>
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* ===== Comments ===== */}
            <div className="space-y-4">
                {question.comments.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                        No comments yet.
                    </p>
                )}

                {question.comments.map((comment) => (
                    <CommentItem
                        key={comment.id}
                        comment={comment}
                        onEdit={(content) => {
                            if (!user) return
                            updateComment(
                                question.id,
                                comment.id,
                                content,
                                user.id
                            )
                        }}
                    />
                ))}
            </div>

            {/* ===== Add Comment ===== */}
            {user && (
                <CommentForm
                    onSubmit={(content) =>
                        addComment(question.id, content, user.id)
                    }
                />
            )}
        </div>
    )
}
