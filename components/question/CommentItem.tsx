"use client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useAuthStore } from "@/store/auth.store"
import { QuestionComment } from "@/types/question"

export function CommentItem({
    comment,
    onEdit,
}: {
    comment: QuestionComment
    onEdit: (content: string) => void
}) {
    const user = useAuthStore((s) => s.user)
    const isOwner = user?.id === comment.authorId

    const [editing, setEditing] = useState(false)
    const [content, setContent] = useState(comment.content)

    return (
        <div className="border rounded p-3 space-y-2">
            {editing ? (
                <>
                    <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <Button
                        size="sm"
                        onClick={() => {
                            onEdit(content)
                            setEditing(false)
                        }}
                    >
                        Save
                    </Button>
                </>
            ) : (
                <>
                    <p>{comment.content}</p>
                    {isOwner && (
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditing(true)}
                        >
                            Edit
                        </Button>
                    )}
                </>
            )}
        </div>
    )
}
