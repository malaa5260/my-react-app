import { Form, Link, useLoaderData, useNavigate, useNavigation } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { useBlog } from "~/context/BlogContext";

type Post = {
  id: number;
  title: string;
  body: string;
};

type BlogLoaderData = {
  posts: Post[];
  page: number;
  totalPages: number;
  search: string;
};

// export async function loader({ request }: LoaderFunctionArgs) {
//   const url = new URL(request.url);
//   let page = Number(url.searchParams.get("page")) || 1;
//   const search = url.searchParams.get("search")?.toLowerCase() || "";
//   const limit = 5;

//   const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//   if (!res.ok) throw new Response("Failed to load posts", { status: 500 });

//   let allPosts: Post[] = await res.json();
//   if (search.trim()) {
//     const keyword = search.trim().toLowerCase();
//     allPosts = allPosts.filter(
//       (post) =>
//         post.title.toLowerCase().includes(keyword) ||
//         post.body.toLowerCase().includes(keyword)
//     );
//   }
//   const totalPages = Math.ceil(allPosts.length / limit);
//   if (page < 1) page = 1;
//   if (page > totalPages) page = totalPages;

//   const start = (page - 1) * limit + 1;
//   const paginated = allPosts.slice(start, start + limit);
//   return { posts: paginated, page, totalPages, search } as BlogLoaderData;
// }

export default function Blog() {
  // const { posts, page, totalPages, search } = useLoaderData<BlogLoaderData>();
  const { posts, page, totalPages, search, setSearch, setPage, isLoading } =
    useBlog();
  const pages = getVisiblePages(page, totalPages);
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-600">Blog</h1>
        <button
          onClick={() => navigate("/blog/new")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
        >
          + Add Post
        </button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setPage(1);
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts..."
          className="p-2 border border-gray-300 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        >
          Search
        </button>
      </form>
      {isLoading ? (
        <ul className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonPost key={i} />
          ))}
        </ul>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li
              key={post.id}
              className="border p-4 rounded shadow hover:shadow-md"
            >
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
      )}
      {posts.length === 0 && !isLoading && (
        <p className="text-gray-500">No posts found.</p>
      )}
      {/* Pagination Controls */}
      <div className="flex items-center justify-between pt-4 max-w-xs">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          className={`px-3 py-2 rounded ${
            page <= 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-500"
          }`}
        >
          Prev
        </button>
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-2 rounded ${
              p === page
                ? "bg-blue-700 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
          className={`px-3 py-2 rounded ${
            page >= totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-500"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
// helper function
function getVisiblePages(current: number, total: number, delta: number = 1) {
  const pages = [];
  const start = Math.max(1, current - delta);
  const end = Math.min(total, current + delta);
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
}
function SkeletonPost() {
  return (
    <div className="border p-4 rounded shadow animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-2/3 mb-3"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
    </div>
  );
}
