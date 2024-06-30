import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

type Todo = {
  note: string;
};

function App() {
  const [todoList, setTodoList] = useState<Todo[] | null>(null);
  const [todo, setTodo] = useState<string>("");

  const addTodo = (note: string) => {
    const newTodo: Todo = { note };
    setTodoList((prevTodoList) => {
      if (prevTodoList) {
        return [...prevTodoList, newTodo];
      } else {
        return [newTodo];
      }
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  return (
    <main className="bg-[#8ecae6] h-screen flex justify-center items-center">
      <div className="bg-[#023047] w-[30%] h-[80%] flex flex-col gap-4 items-center p-5 rounded-sm">
        <p className="text-white text-2xl">Get Things Done!</p>
        <div className="add-todo-container flex w-full">
          <input
            className="w-full border-[1px] border-[#219ebc] bg-inherit p-1 text-sm text-white"
            placeholder="What is the task today?"
            onChange={onChange}
          />
          <button
            className="bg-[#8ecae6] w-1/4 font-semibold text-sm"
            onClick={() => addTodo(todo)}
          >
            Add Task
          </button>
        </div>
        <div className="todo-container w-full flex flex-col gap-4 items-center h-full overflow-y-auto no-scrollbar">
          {todoList ? (
            todoList.map((todo: Todo, index) => (
              <div
                className="todo w-full bg-[#8ecae6] p-4 rounded-sm flex justify-between items-center"
                key={index}
              >
                <p className="text-inherit">{todo.note}</p>
                <div className="tools flex justify-center items-center gap-2">
                  <FontAwesomeIcon icon={faPenToSquare} />
                  <FontAwesomeIcon icon={faTrashCan} />
                </div>
              </div>
            ))
          ) : (
            <p className="text-white text-xs italic">No Todo list for today.</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
