"use client"

import { QuestionCard } from "@/components/question/QuestionCard"
import { useQuestionStore } from "@/store/question.store"

export default function HomePage() {
  const questions = useQuestionStore((s) => s.questions)

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* ===== Header ===== */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">
          All Questions
        </h1>
        <p className="text-sm text-muted-foreground">
          Browse questions asked by the community
        </p>
      </div>

      {/* ===== List ===== */}
      <div className="space-y-3">
        {questions.length === 0 ? (
          <div className="rounded-md border p-8 text-center text-muted-foreground">
            No questions yet. Be the first to ask one!
          </div>
        ) : (
          questions.map((q) => (
            <div key={q.id} className="flex gap-2">
              <QuestionCard key={q.id} question={q} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}
