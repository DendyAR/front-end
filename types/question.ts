export type QuestionStatus = "open" | "answered" | "closed";

export type QuestionComment = {
	id: string;
	content: string;
	authorId: string;
	createdAt: Date;
};

export type Question = {
	id: string;
	title: string;
	description: string;
	status: QuestionStatus;
	authorId: string;
	authorName: string;
	createdAt: Date;
	comments: QuestionComment[];
};
