import { useReducer } from "react";
import { initialState, reducer } from "./state/reducers/todos";
import { Card } from "./components/ui/card";
import TodoForm from "./components/todo-form";
import TodoList from "./components/todo-list";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <main className="mx-auto max-w-xl p-4">
      <Card className="p-4 space-y-4">
        <TodoForm dispatch={dispatch} />
        <TodoList state={state} dispatch={dispatch} />
      </Card>
    </main>
  );
};

export default App;
