import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { TodoApp } from "~/components/TodoApp";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return(
    <div className="space-y-8">
      <Welcome />
      <TodoApp />
    </div>
  )
}
