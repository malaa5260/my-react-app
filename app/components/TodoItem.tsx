import type { FC } from "react";
import type { Todo } from "./TodoApp";

interface TodoItemProps {
  todo: Todo;
  onDelete: () => void;
  onToggle: () => void;
}

export const TodoItem: FC<TodoItemProps> = ({ todo, onDelete, onToggle }) => {
  return (
    <li className="bg-gray-100 p-2 rounded flex justify-between items-center">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={onToggle}
          className="w-6 h-6 cursor-pointer"
        />
        <span className={`text-gray-800 ${todo.done ? "line-through" : ""}`}>
          {todo.text}
        </span>
      </div>
      <button onClick={onDelete} className="text-red-500 hover:text-red-700">
        Delete
      </button>
    </li>
  );
};
