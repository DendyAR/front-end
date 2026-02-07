"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SEED_USER_ID } from "@/constants/seed";

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
						id: SEED_USER_ID, // 🔥 SAMA dengan seed question
						username,
					},
				}),

			logout: () => set({ user: null }),
			reset: () => set({ user: null }),
		}),
		{
			name: "auth-storage",
		},
	),
);
