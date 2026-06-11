import { fetchSlowPosts } from '@/lib/api';
import { PostCard } from '@/lib/types';

export async function PostsListSuspense() {
  const posts = await fetchSlowPosts();

  return (
    <ul className="space-y-2">
      {posts.map((post: PostCard) => (
        <li key={post.id} className="border-b pb-2">
          <h3 className="font-semibold">{post.title}</h3>
          <p className="text-sm text-gray-600">{post.body.substring(0, 100)}...</p>
        </li>
      ))}
    </ul>
  );
}
