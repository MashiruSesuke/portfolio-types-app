import { fetchData } from '@/utils/fetch';
import { Post } from '@/lib/types';

export async function fetchPosts(): Promise<Post[]> {
  return await fetchData<Post[]>('https://jsonplaceholder.typicode.com/posts?_limit=10');
}

export async function fetchPost(id: number) {
  return await fetchData(`https://jsonplaceholder.typicode.com/posts/${id}`);
}
