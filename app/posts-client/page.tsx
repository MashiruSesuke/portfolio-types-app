import { Metadata } from 'next';

import { ClientCounter } from '@/components/ClientCounter';
import { PostsListQuery } from '@/components/PostsListQuery';
import { QuickPostForm } from '@/components/QuickPostForm';

export const metadata: Metadata = {
  title: 'Posts list (client fetch with TanStack Query)',
  description:
    'Also uses client components: ClientCounter (simple counter) and QuickPostForm (creating a new post with client invalidation cache with TanStackQuery)',
};

export default async function PostsPage() {
  return (
    <div className="grid container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Posts (TanStack Query)</h1>
      <a href="/posts" className="mb-4 justify-self-start underline hover:opacity-80">
        Posts with server request
      </a>
      <ClientCounter />
      <QuickPostForm />
      <PostsListQuery />
    </div>
  );
}
