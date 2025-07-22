import { Form } from "react-router";

type BlogFormProps = {
  defaultValues?: { title?: string; body?: string };
  buttonLabel: string;
};

export default function BlogForm({
  defaultValues,
  buttonLabel,
}: BlogFormProps) {
  return (
    <Form method="post" className="space-y-4 max-w-2xl">
      <input
        type="text"
        name="title"
        defaultValue={defaultValues?.title || ""}
        placeholder="Post Title"
        className="w-full p-2 border border-gray-300 rounded"
        required
      />
      <textarea
        name="body"
        defaultValue={defaultValues?.body || ""}
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
    </Form>
  );
}
