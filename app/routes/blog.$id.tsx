import { isRouteErrorResponse, useLoaderData, useRouteError, type LoaderFunctionArgs } from "react-router";

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

export default function BlogPost() {
  const post = useLoaderData<Post>();
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-blue-600">{post.title}</h1>
      <p className="text-gray-700">{post.body}</p>
    </div>
  );
}
export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <p className="text-red-600">This blog post does not exist.</p>;
    }
    return <p className="text-red-600">Something went wrong: {error.statusText}</p>;
  }
  return <p className="text-red-600">An unexpected error occurred.</p>;
}