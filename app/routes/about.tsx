import { type LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import type { Route } from "./+types/about";
type User = {
  id: number;
  name: string;
  email: string;
};
export function meta({}: Route.MetaArgs) {
  return [
    { title: "About" },
    { name: "description", content: "Learn more about this To‑Do app." },
  ];
}

export async function loader({ request }: LoaderFunctionArgs) {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await response.json();
  return users;
}

export default function About() {
  const users = useLoaderData<typeof loader>();

  return (
    <div className="space-y-4 card bg-white p-4 rounded-2xl">
      <h1 className="text-3xl font-bold text-blue-600">About Us</h1>
      <p className="text-gray-700">
        Here’s a list of our awesome users fetched via Loader:
      </p>

      <ul className="list-disc pl-6 text-gray-800">
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> – {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
