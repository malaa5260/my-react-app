import {
  redirect,
  useLoaderData,
  useNavigate,
  useParams,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
import BlogForm from "~/components/shared/BlogForm";
import { useBlog } from "~/context/BlogContext";

type Post = { id: number; title: string; body: string };

// export async function loader({ params }: LoaderFunctionArgs) {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${params.id}`
//   );
//   if (!res.ok) throw new Response("Post not found", { status: 404 });
//   const post = await res.json();
//   return post as Post;
// }

// export async function action({ request, params }: ActionFunctionArgs) {
//   const formData = await request.formData();
//   const updatedPost = {
//     title: formData.get("title"),
//     body: formData.get("body"),
//   };
//   await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`, {
//     method: "PUT",
//     headers: { "content-type": "application/json" },
//     body: JSON.stringify(updatedPost),
//   });
//   return redirect(`/blog/${params.id}`);
// }

export default function EditPost() {
  // const post = useLoaderData<Post>();
  const { id } = useParams();
  const blogId = Number(id);
  const navigate = useNavigate();
  const { posts, updatePost } = useBlog();

  const post = posts.find((p) => p.id === blogId);

  if (!post) {
    return <p className="text-red-500">Post not found.</p>;
  }

  const handleUpdate = (title: string, body: string) => {
    updatePost(blogId, { title, body });
    navigate("/blog");
  };
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-blue-600">Edit Post</h1>
      <BlogForm
        buttonLabel="Update"
        initialTitle={post.title}
        initialBody={post.body}
        onSubmit={handleUpdate}
      />
    </div>
  );
}
