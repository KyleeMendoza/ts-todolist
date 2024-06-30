import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

type Todo = {
  note: string;
  editable: boolean;
};

function App() {
  const [todoList, setTodoList] = useState<Todo[] | null>(null);
  const [todo, setTodo] = useState<string>("");

  const addTodo = (note: string) => {
    const newTodo: Todo = { note, editable: false };
    if (note) {
      setTodoList((prevTodoList) => {
        if (prevTodoList) {
          return [...prevTodoList, newTodo];
        } else {
          return [newTodo];
        }
      });
      setTodo("");
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const onDelete = (index: number) => {
    setTodoList((prevTodoList) =>
      (prevTodoList ?? []).filter((_, i) => i !== index)
    );
  };

  const onUpdate = (index: number) => {
    setTodoList((prevTodoList) =>
      (prevTodoList ?? []).map((item, key) => {
        if (key === index) {
          return { ...item, editable: true };
        }
        return item;
      })
    );
  };

  const onEdit = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoList((prevTodoList) =>
      (prevTodoList ?? []).map((item, key) => {
        if (key === index) {
          return { ...item, note: e.target.value };
        }
        return item;
      })
    );
  };

  const onSave = (index: number) => {
    setTodoList((prevTodoList) =>
      (prevTodoList ?? []).map((item, key) => {
        if (key === index) {
          return { ...item, editable: false };
        }
        return item;
      })
    );
  };

  return (
    <main className="bg-[#8ecae6] h-screen flex justify-center items-center">
      <div className="bg-[#023047] w-[30%] h-[80%] flex flex-col gap-4 items-center p-5 rounded-sm">
        <p className="text-2xl text-white">Get Things Done!</p>
        <div className="flex w-full add-todo-container">
          <input
            className="w-full border-[1px] border-[#219ebc] bg-inherit p-1 text-sm text-white"
            placeholder="What is the task today?"
            value={todo}
            onChange={onChange}
          />
          <button
            className="bg-[#8ecae6] w-1/4 font-semibold text-sm"
            onClick={() => addTodo(todo)}
          >
            Add Task
          </button>
        </div>
        <div className="flex flex-col items-center w-full h-full gap-4 overflow-y-auto todo-container no-scrollbar">
          {todoList ? (
            todoList.map((todo: Todo, index) => (
              <div
                className="todo w-full bg-[#8ecae6] p-3 rounded-sm flex justify-between items-center"
                key={index}
              >
                {todo.editable ? (
                  <input
                    className="w-full border-[1px] border-[#219ebc] bg-inherit p-1 text-sm text-white"
                    value={todo.note}
                    onChange={(e) => onEdit(index, e)}
                  />
                ) : (
                  <p className="text-inherit">{todo.note}</p>
                )}

                {todo.editable ? (
                  <button
                    className="bg-[#023047] px-2 py-1 rounded-sm text-white font-semibold text-sm"
                    onClick={() => onSave(index)}
                  >
                    Save
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-2 tools">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      onClick={() => onUpdate(index)}
                      className="cursor-pointer"
                    />
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      color="red"
                      onClick={() => onDelete(index)}
                      className="cursor-pointer"
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-xs italic text-white">No Todo list for today.</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
