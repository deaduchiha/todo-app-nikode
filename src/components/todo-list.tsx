import type { TAction, TState } from "@/types/todos";
import TodoItem from "./todo-item";
import { ScrollArea } from "./ui/scroll-area";
import type { Dispatch } from "react";

const TodoList = ({
  state,
  dispatch,
}: {
  state: TState;
  dispatch: Dispatch<TAction>;
}) => {
  return (
    <ScrollArea className="h-96 pr-3">
      <ul className="space-y-2">
        {state.todos.map((t) => (
          <TodoItem key={t.id} todo={t} dispatch={dispatch} />
        ))}
      </ul>
    </ScrollArea>
  );
};

export default TodoList;
