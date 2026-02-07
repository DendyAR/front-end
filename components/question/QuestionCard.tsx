import Link from "next/link"
import { Question } from "@/types/question"
import { useAuthStore } from "@/store/auth.store"

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function QuestionCard({ question }: { question: Question }) {
    const user = useAuthStore((s) => s.user)

    const authorName =
        question.authorId === user?.id
            ? user.username
            : "Another user"

    return (
        <Link href={`/question/${question.id}`}>
            <Card className="hover:bg-muted/50 transition">
                <CardHeader className="space-y-2">
                    {/* Title + Status */}
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-base">
                            {question.title}
                        </CardTitle>
                        <Badge variant="outline">
                            {question.status}
                        </Badge>
                    </div>

                    {/* Author line */}
                    <div className="text-xs text-muted-foreground">
                        Asked by <span className="font-medium">{authorName}</span>
                    </div>
                </CardHeader>

                {/* Divider */}
                <Separator />

                <CardContent className="space-y-2 pt-4">
                    {/* Description preview */}
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {question.description}
                    </p>

                    {/* Meta info */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                            {question.comments.length} comments
                        </span>

                        <span>
                            {new Date(question.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
