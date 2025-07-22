import {
  Form,
  isRouteErrorResponse,
  Link,
  redirect,
  useLoaderData,
  useRouteError,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";

type Post = {
  id: number;
  title: string;
  body: string;
};

export async function loader({ params }: LoaderFunctionArgs) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  if (!res.ok) {
    throw new Response("Post not found", { status: 404 });
  }
  const post = await res.json();
  return post as Post;
}
export async function action({ params }: ActionFunctionArgs) {
  await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`, {
    method: "DELETE",
  });
  return redirect("/blog");
}
export default function BlogPost() {
  const post = useLoaderData<Post>();
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-blue-600">{post.title}</h1>
      <p className="text-gray-700">{post.body}</p>
      <div className="flex gap-4 mt-6">
        <Link
          to={`/blog/${post.id}/edit`}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-400"
        >
          Edit
        </Link>

        <Form method="post">
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
          >
            Delete
          </button>
        </Form>
      </div>
    </div>
  );
}
export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <p className="text-red-600">This blog post does not exist.</p>;
    }
    return (
      <p className="text-red-600">Something went wrong: {error.statusText}</p>
    );
  }
  return <p className="text-red-600">An unexpected error occurred.</p>;
}
