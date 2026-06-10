import { fetchData } from '@/utils/fetch';
import { Post } from '@/lib/types';

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
  if (!res.ok) throw new Error('Failter to delete post');
}
