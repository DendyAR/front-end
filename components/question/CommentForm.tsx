"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function CommentForm({ onSubmit }: { onSubmit: (c: string) => void }) {
    const [content, setContent] = useState("")

    return (
        <div className="space-y-2">
            <Textarea
                placeholder="Add a comment..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <Button
                onClick={() => {
                    if (!content.trim()) return
                    onSubmit(content)
                    setContent("")
                }}
            >
                Comment
            </Button>
        </div>
    )
}
