import Link from "next/link"
import { Question } from "@/types/question"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function QuestionCard({ question }: { question: Question }) {
    return (
        <Link href={`/question/${question.id}`}>
            <div className="flex gap-4 rounded-md border p-4 hover:bg-muted/50 transition">
                {/* ===== LEFT: STATS ===== */}
                <div className="w-20 shrink-0 text-center text-xs text-muted-foreground space-y-1">
                    <div className="font-medium text-foreground">
                        {question.comments.length}
                    </div>
                    <div>answers</div>

                    <Badge
                        variant={
                            question.status === "answered"
                                ? "default"
                                : question.status === "closed"
                                    ? "secondary"
                                    : "outline"
                        }
                        className="mt-1"
                    >
                        {question.status}
                    </Badge>
                </div>

                <Separator orientation="vertical" />

                {/* ===== RIGHT: CONTENT ===== */}
                <div className="flex-1 space-y-2">
                    <h2 className="font-medium text-base leading-snug">
                        {question.title}
                    </h2>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {question.description}
                    </p>

                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>
                            asked by{" "}
                            <span className="font-medium text-foreground">
                                {question.authorName}
                            </span>
                        </span>

                        <span>
                            {new Date(question.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
