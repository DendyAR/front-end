# QnA App (Single Page Application)

This is a **Question & Answer (QnA) web application** inspired by Stack Overflow, built using **Next.js App Router**.
The application is implemented as a **Single Page Application (SPA)** with **client-side state management only** — no backend or database required.

All data is stored **in memory and persisted to localStorage** using Zustand.

---

## Features

### Authentication (Mocked)
- Simple login using **username only**
- No real authentication or backend integration
- Login state persists until logout or storage reset

### Questions
- View a list of questions
- Create a new question
- Edit questions created by the logged-in user
- Change question status (**open / answered / closed**) for own questions only
- Initial seed question loaded on first application load

### Comments
- Add comments to any question
- Edit comments created by the logged-in user
- Comments update instantly without page reload

### UI & UX
- Fully responsive layout (desktop & mobile)
- Stack Overflow–style question list
- Clean and modern UI using **shadcn/ui**
- Client-side navigation (SPA behavior)

### Developer Utilities
- Dev-only **Reset Storage** button
- Persistent state using `localStorage`

---

## Tech Stack

- **Next.js (App Router)**
- **React**
- **TypeScript**
- **Zustand** (state management)
- **Zustand Persist** (localStorage)
- **Tailwind CSS**
- **shadcn/ui**

---

## Access Control Rules

| Action | Permission |
|------|------------|
| Create question | Logged-in users |
| Edit question | Question owner only |
| Change question status | Question owner only |
| Add comment | Any logged-in user |
| Edit comment | Comment owner only |

Access control is enforced both:
- In the **UI layer** (conditional rendering)
- In the **state layer** (safe Zustand updates)

---

## Project Structure

```
app/
 ├─ page.tsx              # Question list page
 ├─ ask/ 
 ├─ login/page.tsx        # login page
 ├─ question/[id]/        # Question detail page
 └─ layout.tsx            # Root layout

components/
 ├─ Navbar.tsx
 ├─ AppShell.tsx
 ├─ DevResetButton.tsx
 ├─ theme-provider.tsx
 ├─ ToogleTheme.tsx
 ├─ AuthGuard.tsx
 └─ question/
     ├─ QuestionCard.tsx
     ├─ QuestionStatusDropdown.tsx
     ├─ EditQuestionForm.tsx
     ├─ CommentItem.tsx
     └─ CommentForm.tsx

store/
 ├─ auth.store.ts
 └─ question.store.ts
ui/
 ├─ shdcn components

types/
 └─ question.ts
```

---

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open your browser and navigate to:

```
http://localhost:3000
```

The app will automatically reload as you edit the source files.

---

## Development Notes

### State Persistence
- All application data is stored in `localStorage`
- State persists across page refreshes
- Dev-only reset button clears stored state safely

### React Strict Mode
- React Strict Mode is enabled during development
- Double render behavior is expected and handled correctly
- Production build renders normally

---

## Limitations

- No backend or API
- Mock authentication only
- Single-device, single-user simulation
- Intended for learning, demo, and technical evaluation purposes