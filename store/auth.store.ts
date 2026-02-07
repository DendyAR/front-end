"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthUser = {
	id: string;
	username: string;
};

type AuthState = {
	user: AuthUser | null;
	login: (username: string) => void;
	logout: () => void;
	reset: () => void;
};

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,

			login: (username) =>
				set({
					user: {
						id: crypto.randomUUID(),
						username,
					},
				}),

			logout: () => set({ user: null }),
			reset: () => set({ user: null }),
		}),
		{
			name: "auth-storage", // key localStorage
		},
	),
);
