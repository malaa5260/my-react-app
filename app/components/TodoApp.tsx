"use client";
import { useEffect, useState } from "react";
import { TodoItem } from "./TodoItem";
import { TodoForm } from "./TodoForm";
export interface Todo {
  text: string;
  done: boolean;
}
export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { text: input, done: false }]);
    setInput("");
  };

  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };
  const toggleDone = (index: number) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, done: !todo.done } : todo
      )
    );
  };
  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-semibold mb-4 text-green-600 text-center">
        📝 To‑Do App
      </h2>
      <TodoForm
        input={input}
        onInputChange={setInput}
        onAdd={addTodo}
      ></TodoForm>
      <ul className="space-y-2">
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            onDelete={() => deleteTodo(index)}
            onToggle={() => toggleDone(index)}
          />
        ))}
      </ul>
    </div>
  );
}
