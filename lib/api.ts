import { fetchData } from '@/utils/fetch';
import { Post, User } from '@/lib/types';

export async function fetchPosts(): Promise<Post[]> {
  return await fetchData<Post[]>('https://jsonplaceholder.typicode.com/posts?_limit=10');
}

export async function fetchPost(id: number) {
  return await fetchData(`https://jsonplaceholder.typicode.com/posts/${id}`);
}

export async function deletePost(id: number): Promise<void> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete post');
}

export async function fetchSlowUsers(): Promise<User[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return await fetchData('https://jsonplaceholder.typicode.com/users?_limit=3');
}

export async function fetchSlowPosts(): Promise<Post[]> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return await fetchData('https://jsonplaceholder.typicode.com/posts?_limit=3');
}
