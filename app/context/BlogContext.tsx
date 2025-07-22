import { createContext, useContext, useState, type ReactNode } from "react";

export type Post = {
  id: number;
  title: string;
  body: string;
};

type BlogContextType = {
  posts: Post[];
  addPost: (post: Omit<Post, "id">) => void;
  deletePost: (id: number) => void;
  updatePost: (id: number, updated: Omit<Post, "id">) => void;
};

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, title: "Welcome to My Blog", body: "This is the first post." },
    { id: 2, title: "React Tips", body: "React is great for building UIs." },
  ]);
  const addPost = (post: Omit<Post, "id">) => {
    setPosts((prevPosts) => [...prevPosts, { ...post, id: Date.now() }]);
  };
  const deletePost = (id: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };
  const updatePost = (id: number, updated: Omit<Post, "id">) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === id ? { ...post, ...updated } : post))
    );
  };
  return (
    <BlogContext.Provider value={{ posts, addPost, deletePost, updatePost }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used inside BlogProvider");
  }
  return context;
}
