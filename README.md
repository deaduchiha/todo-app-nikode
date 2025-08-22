# Phase 1 — Advanced Todo App with shadcn/ui + Tailwind

- Add **shadcn/ui preset** later via shadcn installation.

1. Install shadcn/ui:

```bash
bunx --bun shadcn@latest add button input checkbox switch card scroll-area dialog alert-dialog badge separator sonner
```

> Note: shadcn/ui components go into `components/ui/*`. Dark mode is managed by applying `dark` class on `<html>` or via your own provider.

---

## Session 1 — Setup & Skeleton

**Final output:** Display todo list + add form.

### Before coding (10 min)

- Review architecture: **state → UI** using `useReducer` at the app root.
- Folder structure:

```
src/App.tsx
src/components/todo-form.tsx
src/components/todo-list.tsx
src/components/todo-item.tsx
src/state/reducers/todos.ts
src/types/todos.ts
```

### Workshop steps

1. **Define types and state**
   `src/types/todos.ts`

```ts
export type TTodo = {
  id: string;
  title: string;
  done: boolean;
  createdAt: number;
};
export type TFilter = "all" | "active" | "done";

export type TState = {
  todos: Todo[];
  filter: Filter;
  query: string; // used in Session 3
};

export type TAction =
  | { type: "ADD_TODO"; title: string }
  | { type: "TOGGLE_TODO"; id: string }
  | { type: "EDIT_TODO"; id: string; title: string }
  | { type: "REMOVE_TODO"; id: string }
  | { type: "SET_FILTER"; filter: Filter }
  | { type: "SET_QUERY"; query: string };
```

2. **Reducer skeleton**
   `state/reducers/todos.ts`

```ts
import type { TAction, TState } from "@/types/todos";
import { nanoid } from "nanoid"; // bun add nanoid

export const initialState: State = { todos: [], filter: "all", query: "" };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TODO":
      if (!action.title.trim()) return state;
      return {
        ...state,
        todos: [
          {
            id: nanoid(),
            title: action.title.trim(),
            done: false,
            createdAt: Date.now(),
          },
          ...state.todos,
        ],
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.id ? { ...t, done: !t.done } : t
        ),
      };
    case "EDIT_TODO":
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.id ? { ...t, title: action.title } : t
        ),
      };
    case "REMOVE_TODO":
      return { ...state, todos: state.todos.filter((t) => t.id !== action.id) };
    case "SET_FILTER":
      return { ...state, filter: action.filter };
    case "SET_QUERY":
      return { ...state, query: action.query };
    default:
      return state;
  }
}
```

3. **App + useReducer provider**
   `src/App.tsx`

```tsx
import { useReducer } from "react";
import { initialState, reducer } from "./state/reducers/todos";
import { Card } from "./components/ui/card";
import TodoForm from "./components/todo-form";
import TodoList from "./components/todo-list";

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <main className="mx-auto max-w-xl p-4">
      <Card className="p-4 space-y-4">
        <TodoForm dispatch={dispatch} />
        <TodoList state={state} dispatch={dispatch} />
      </Card>
    </main>
  );
}
```

4. **Add form with shadcn/ui**
   `components/todo-form.tsx`

```tsx
import { FormEvent, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TodoForm({ dispatch }: { dispatch: any }) {
  const ref = useRef<HTMLInputElement>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const v = ref.current?.value ?? "";
    dispatch({ type: "ADD_TODO", title: v });
    if (ref.current) ref.current.value = "";
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <Input ref={ref} placeholder="What’s on your mind?" />
      <Button type="submit">Add</Button>
    </form>
  );
}
```

5. **List & item**
   `components/todo-list.tsx`

```tsx
import type { TAction, TState } from "@/types/todos";
import TodoItem from "./todo-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Dispatch } from "react";

export default function TodoList({
  state,
  dispatch,
}: {
  state: State;
  dispatch: Dispatch<TAction>;
}) {
  return (
    <ScrollArea className="h-96 pr-3">
      <ul className="space-y-2">
        {state.todos.map((t) => (
          <TodoItem key={t.id} todo={t} dispatch={dispatch} />
        ))}
      </ul>
    </ScrollArea>
  );
}
```

`components/todo-item.tsx`

```tsx
import type { TAction, TTodo } from "@/types/todos";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import type { Dispatch } from "react";

export default function TodoItem({
  todo,
  dispatch,
}: {
  todo: Todo;
  dispatch: Dispatch<TAction>;
}) {
  return (
    <li className="flex items-center  gap-3 justify-between rounded-md border p-2">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={todo.done}
          onCheckedChange={() => dispatch({ type: "TOGGLE_TODO", id: todo.id })}
        />
        <span className={todo.done ? "line-through opacity-60" : ""}>
          {todo.title}
        </span>
      </div>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          onClick={() => {
            const title = prompt("Edit title:", todo.title) ?? todo.title;
            dispatch({ type: "EDIT_TODO", id: todo.id, title });
          }}
        >
          Edit
        </Button>
        <Button
          variant="destructive"
          onClick={() => dispatch({ type: "REMOVE_TODO", id: todo.id })}
        >
          Delete
        </Button>
      </div>
    </li>
  );
}
```

### Session 1 delivery checklist

- [ ] Basic CRUD works (add/remove/toggle/edit).
- [ ] No empty item is added.
- [ ] React console is warning-free.

### Homework challenge (Session 1)

- **Validation:** show a `toast` error if input is empty (use shadcn/ui sonner).

---

## Session 2 — Context + Ref + Persistence

**Final output:** Dark/light theme + localStorage persistence + auto-focus after add.
**Duration:** 90 min

### Workshop steps

1. **ThemeContext + toggle**
   `contexts/ThemeContext.tsx`

```tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "light",
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  return (
    <ThemeCtx.Provider
      value={{
        theme,
        toggle: () => setTheme((t) => (t === "light" ? "dark" : "light")),
      }}
    >
      {children}
    </ThemeCtx.Provider>
  );
}
export const useTheme = () => useContext(ThemeCtx);
```

- Wrap `ThemeProvider` around children in `app/layout.tsx`.
- Add theme toggle in `App.tsx` with `Switch` + `Separator`.

2. **Persist with localStorage**
   `lib/todos/storage.ts`

```ts
import { State } from "./types";
const KEY = "todos:v1";
export const loadState = (): State | null => {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(KEY) || "null");
  } catch {
    return null;
  }
};
export const saveState = (s: State) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(s));
};
```

- In `App.tsx`, initialize from `loadState()`, save on every change.

3. **useRef for auto-focus**
   After adding, reset focus on input:

   ```tsx
   if (ref.current) ref.current.focus();
   ```

### Homework (Session 2)

- Debounce saving to localStorage (setTimeout + cleanup in `useEffect`).

### Session 2 delivery checklist

- [ ] Dark/light theme toggle with `Switch`.
- [ ] Data persists across refresh.
- [ ] Input auto-focuses after adding.

---

## Session 3 — Filters / Search + UX

**Final output:** Filter (All / Active / Done) + Search + smooth scroll to edited item.
**Duration:** 90–120 minutes

### Workshop steps

1. Add filter/search controls in header.
2. Filter + query handling in `TodoList` (optionally `useMemo`).
3. Smooth scroll to edited item using `scrollIntoView`.
4. Confirm delete with `AlertDialog`.
5. Toast feedback for add/edit/delete actions.

### Homework (Session 3)

- Animate item entry/exit with Tailwind transitions.

### Session 3 delivery checklist

- [ ] Filter + search fully functional.
- [ ] Smooth scroll after edit.
- [ ] Simple animations for items.

---

## Mapping to shadcn/ui components (quick reference)

- **Form:** `Input`, `Button`
- **Item:** `Checkbox`, `Button (secondary/destructive)`
- **Layout:** `Card`, `ScrollArea`, `Separator`
- **Theme:** `Switch`
- **Feedback:** `Toast`, `AlertDialog`
- **Meta:** `Badge` for counters (e.g., active count)

---

## Acceptance criteria for Phase 1 (to demo live)

- Full CRUD with no console errors
- Stable dark/light theme (persisted)
- LocalStorage sync (load once + save on change + debounce)
- Accurate search/filter
- UX niceties: auto-focus, confirm delete, smooth scroll, light animations

---

## Teaching notes & common pitfalls

- **Next.js hydration:** only access `window/localStorage` in client code.
- **Keys:** always `key={todo.id}`, never list index.
- **Immutable reducer:** don’t mutate state.
- **ToastProvider:** must be added in `app/layout.tsx`.
- **Dark mode:** Tailwind config should use `dark: "class"`.

---

## Optional final challenge (+1 grade)

- Inline edit with `Input` + Enter/ESC confirm.
- Empty state card with “Add your first task” prompt.
- Export/Import JSON for tasks.

---

👉 If you want, I can also prepare a **starter project skeleton** (files + reducer + blank UI) for your students to begin with.

---

Would you like me to also **translate the checklists and challenges into simple student-friendly English phrasing** (less technical, more instructional)?
