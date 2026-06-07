import { ClientCounter } from '@/components/ClientCounter';
import { PostsList } from '@/components/PostsList';

async function fetPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    next: { revalidate: 60 }, // check bor updated every 60 sec (ISR)
  });

  if (!res.ok) throw new Error('Faile to fetch posts');
  return res.json();
}

async function getUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  return res.json();
}

export default async function PostsPage() {
  // Parallel loading posts and users
  const [posts, users] = await Promise.all([fetPosts(), getUsers()]);

  // Create a user map for quick access
  const usersMap = Object.fromEntries(
    users.map((user: { id: number; name: string }) => [user.id, user.name])
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Posts (server component)</h1>
      <ClientCounter />
      <PostsList initialPosts={posts} usersMap={usersMap} />
    </div>
  );
}
