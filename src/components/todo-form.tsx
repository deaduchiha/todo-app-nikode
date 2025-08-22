import type { TAction } from "@/types/todos";
import { useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const TodoForm = ({ dispatch }: { dispatch: React.Dispatch<TAction> }) => {
  const ref = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = ref.current?.value;
    if (!value) return;

    dispatch({ type: "ADD_TODO", title: value });
    ref.current!.value = "";
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <Input ref={ref} placeholder="Add a new todo" />
      <Button type="submit">Add</Button>
    </form>
  );
};

export default TodoForm;
