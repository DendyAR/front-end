"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Question } from "@/types/question"

export function EditQuestionForm({
    question,
    onSave,
    onCancel,
}: {
    question: Question
    onSave: (data: { title: string; description: string }) => void
    onCancel: () => void
}) {
    const [title, setTitle] = useState(question.title)
    const [description, setDescription] = useState(question.description)

    return (
        <div className="space-y-3">
            <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <Textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <div className="flex gap-2">
                <Button
                    size="sm"
                    onClick={() =>
                        onSave({
                            title: title.trim(),
                            description: description.trim(),
                        })
                    }
                    disabled={!title.trim() || !description.trim()}
                >
                    Save
                </Button>

                <Button
                    size="sm"
                    variant="outline"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
            </div>
        </div>
    )
}
