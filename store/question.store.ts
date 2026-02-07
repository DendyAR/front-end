"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Question } from "@/types/question";

type CreateQuestionPayload = Omit<Question, "id" | "createdAt" | "comments">;

type QuestionState = {
	questions: Question[];
	addQuestion: (q: CreateQuestionPayload) => void;
	updateQuestion: (id: string, data: Partial<Question>, userId: string) => void;
	addComment: (questionId: string, content: string, authorId: string) => void;
	updateComment: (
		questionId: string,
		commentId: string,
		content: string,
		userId: string,
	) => void;
	reset: () => void;
};

/* ===== SEED QUESTIONS ===== */
const seedQuestions: Question[] = [
	{
		id: "seed-1",
		title: "How to use Zustand with Next.js?",
		description: "I am confused about client components and state.",
		status: "open",
		authorId: "seed-user",
		authorName: "Seed User",
		createdAt: new Date(),
		comments: [],
	},
];

export const useQuestionStore = create<QuestionState>()(
	persist(
		(set) => ({
			questions: [],

			/* ===== CREATE ===== */
			addQuestion: (q) =>
				set((state) => ({
					questions: [
						{
							...q,
							id: crypto.randomUUID(),
							createdAt: new Date(),
							comments: [],
						},
						...state.questions,
					],
				})),

			/* ===== EDIT QUESTION (OWNER ONLY) ===== */
			updateQuestion: (id, data, userId) =>
				set((state) => ({
					questions: state.questions.map((q) =>
						q.id === id && q.authorId === userId ? { ...q, ...data } : q,
					),
				})),

			/* ===== COMMENTS ===== */
			addComment: (questionId, content, authorId) =>
				set((state) => ({
					questions: state.questions.map((q) =>
						q.id === questionId
							? {
									...q,
									comments: [
										...q.comments,
										{
											id: crypto.randomUUID(),
											content,
											authorId,
											createdAt: new Date(),
										},
									],
								}
							: q,
					),
				})),

			updateComment: (questionId, commentId, content, userId) =>
				set((state) => ({
					questions: state.questions.map((q) =>
						q.id === questionId
							? {
									...q,
									comments: q.comments.map((c) =>
										c.id === commentId && c.authorId === userId
											? { ...c, content }
											: c,
									),
								}
							: q,
					),
				})),

			reset: () => set({ questions: [] }),
		}),
		{
			name: "question-storage",

			/* 🔥 SEED ONLY ON FIRST LOAD */
			merge: (persisted, current) => {
				const persistedState = persisted as QuestionState | undefined;

				if (!persistedState || persistedState.questions.length === 0) {
					return {
						...current,
						questions: seedQuestions,
					};
				}

				// 🔧 Fix Date after hydration
				persistedState.questions.forEach((q) => {
					q.createdAt = new Date(q.createdAt);
					q.comments.forEach((c) => {
						c.createdAt = new Date(c.createdAt);
					});
				});

				return {
					...current,
					...persistedState,
				};
			},
		},
	),
);
