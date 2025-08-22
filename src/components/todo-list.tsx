import type { TAction, TState } from "@/types/todos";
import { ScrollArea } from "./ui/scroll-area";
import TodoItem from "./todo-item";

const TodoList = ({
  state,
  dispatch,
}: {
  state: TState;
  dispatch: React.Dispatch<TAction>;
}) => {
  return (
    <ScrollArea className="max-h-[60vh] overflow-y-scroll overflow-hidden">
      <ul className="space-y-2">
        {state.todos.map((t) => (
          <TodoItem key={t.id} todo={t} dispatch={dispatch} />
        ))}
      </ul>
    </ScrollArea>
  );
};

export default TodoList;
