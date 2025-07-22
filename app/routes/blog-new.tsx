import { redirect, type ActionFunctionArgs } from "react-router";
import BlogForm from "~/components/shared/BlogForm";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const newPost = {
    title: formData.get("title") as string,
    body: formData.get("body") as string,
  };

  await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });

  return redirect("/blog");
}
export default function NewBlog() {
  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-bold text-blue-600">Create New Post</h1>
      <BlogForm buttonLabel="Create" />
    </div>
  );
}
