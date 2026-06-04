'use client';

import { useEffect, useState } from 'react';

import { AsyncState } from '@/utils/fetch';

interface Post {
  id: number;
  title: string;
  body: string;
}

export const PostsList = () => {
  const [state, setState] = useState<AsyncState<Post[]>>({ status: 'loading' });

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((data) => setState({ status: 'success', data }))
      .catch((error) => setState({ status: 'error', error }));
  }, []);

  if (state.status === 'loading') return <div className="p-4">Loading posts...</div>;
  if (state.status === 'error') return <div className="p4 text-red-500">Error: {state.error}</div>;

  return (
    <ul className="space-y-2 p-4">
      {state.data.map((post: Post) => (
        <li key={post.id} className="border-b pb-2">
          <h3 className="font-semibold">{post.title}</h3>
          <p className="text-sm text-gray-600">{post.body}</p>
        </li>
      ))}
    </ul>
  );
};
