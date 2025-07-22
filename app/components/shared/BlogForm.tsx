import { useState } from "react";
import { Form } from "react-router";

type BlogFormProps = {
  buttonLabel: string;
  initialTitle?: string;
  initialBody?: string;
  onSubmit: (title: string, body: string) => void;
};

export default function BlogForm({
  buttonLabel,
  initialTitle = "",
  initialBody = "",
  onSubmit,
}: BlogFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      alert("Please fill out all fields.");
      return;
    }
    onSubmit(title, body);
  };

  return (
    <form  onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post Title"
        className="w-full p-2 border border-gray-300 rounded"
        required
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Post Content"
        className="w-full p-2 border border-gray-300 rounded"
        rows={4}
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
      >
        {buttonLabel}
      </button>
    </form>
  );
}
