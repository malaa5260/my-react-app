import type { FC } from "react";

interface TodoFormProps {
  input: string;
  onInputChange: (value: string) => void;
  onAdd: () => void;
}

export const TodoForm: FC<TodoFormProps> = ({
  input,
  onInputChange,
  onAdd,
}) => {
  return (
    <div className="flex gap-2 mb-4">
      <input
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 flex-1 focus:outline-none focus:ring focus:ring-blue-300"
        placeholder="Add a new task"
      />
      <button
        onClick={onAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add
      </button>
    </div>
  );
};
