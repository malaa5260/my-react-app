import {
  redirect,
  useLoaderData,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
import BlogForm from "~/components/shared/BlogForm";

type Post = { id: number; title: string; body: string };

export async function loader({ params }: LoaderFunctionArgs) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  if (!res.ok) throw new Response("Post not found", { status: 404 });
  const post = await res.json();
  return post as Post;
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const updatedPost = {
    title: formData.get("title"),
    body: formData.get("body"),
  };
  await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(updatedPost),
  });
  return redirect(`/blog/${params.id}`);
}

export default function EditPost() {
  const post = useLoaderData<Post>();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-blue-600">Edit Post</h1>
      <BlogForm defaultValues={post} buttonLabel="Save Changes" />
    </div>
  );
}
