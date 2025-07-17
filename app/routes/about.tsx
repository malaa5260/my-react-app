import type { Route } from "./+types/about";

export function meta() {
  return [
    { title: "About" },
    { name: "description", content: "Learn more about this To‑Do app." },
  ];
}
export default function About({}: Route.MetaArgs) {
  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-4 text-purple-700">📘 About</h1>
      <p className="text-lg text-gray-700">
        This is a simple To‑Do app built with React 19, React Router v7, and Tailwind CSS.
        <br />
        It demonstrates key concepts like:
      </p>
      <ul className="list-disc pl-6 mt-4 text-gray-600 space-y-1">
        <li>Component structure</li>
        <li>Props & State</li>
        <li>Lifting state up</li>
        <li>localStorage integration</li>
        <li>File-based routing (v7)</li>
      </ul>
    </div>
  );
}
