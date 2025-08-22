import type { TAction, TTodo } from "@/types/todos";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import type { Dispatch } from "react";

const TodoItem = ({
  todo,
  dispatch,
}: {
  todo: TTodo;
  dispatch: Dispatch<TAction>;
}) => {
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
};

export default TodoItem;
