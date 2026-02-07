"use client"

import { QuestionCard } from "@/components/question/QuestionCard"
import { useQuestionStore } from "@/store/question.store"


export default function HomePage() {
  const questions = useQuestionStore((s) => s.questions)

  console.log(questions.length, "question map")

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      {questions.map((q) => (
        <QuestionCard key={q.id} question={q} />
      ))}
    </div>
  )
}
