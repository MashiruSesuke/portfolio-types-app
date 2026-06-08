import { ClientCounter } from '@/components/ClientCounter';
import { PostsListQuery } from '@/components/PostsListQuery';

export default async function PostsPage() {
  return (
    <div className="grid container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Posts (TanStack Query)</h1>
      <a href="/posts" className="mb-4 justify-self-start underline hover:opacity-80">
        Posts with server request
      </a>
      <ClientCounter />
      <PostsListQuery />
    </div>
  );
}
