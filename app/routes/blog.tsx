import { Link, useLoaderData, useNavigation } from "react-router";
import type { LoaderFunctionArgs } from "react-router";

type Post = {
  id: number;
  title: string;
  body: string;
};

type BlogLoaderData = {
  posts: Post[];
  page: number;
  totalPages: number;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const limit = 5; // عدد البوستات في كل صفحة
  const start = (page - 1) * limit + 1;
  const end = start + limit - 1;

  // جلب البوستات (jsonplaceholder فيه 100 بوست)
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Response("Failed to load posts", { status: 500 });

  const allPosts: Post[] = await res.json();
  const paginated = allPosts.slice(start - 1, end);
  const totalPages = Math.ceil(allPosts.length / limit);

  return { posts: paginated, page, totalPages } as BlogLoaderData;
}

export default function Blog() {
  const { posts, page, totalPages } = useLoaderData<BlogLoaderData>();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-blue-600">Blog</h1>
      {isLoading && <p className="text-gray-500">Loading posts...</p>}

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded shadow hover:shadow-md">
            <Link
              to={`/blog/${post.id}`}
              className="text-xl font-semibold text-blue-500 hover:underline"
            >
              {post.title}
            </Link>
            <p className="text-gray-700 mt-2">{post.body}</p>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between pt-4">
        <Link
          to={`/blog?page=${page - 1}`}
          className={`px-4 py-2 rounded ${
            page <= 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-500"
          }`}
          aria-disabled={page <= 1}
        >
          Previous
        </Link>

        <span className="text-gray-600">
          Page {page} of {totalPages}
        </span>

        <Link
          to={`/blog?page=${page + 1}`}
          className={`px-4 py-2 rounded ${
            page >= totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-500"
          }`}
          aria-disabled={page >= totalPages}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
