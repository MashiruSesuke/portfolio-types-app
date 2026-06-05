'use client';

import { useState, useMemo } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostsListProps {
  initialPosts: Post[];
  usersMap: Record<number, string>;
}

export const PostsList = ({ initialPosts, usersMap }: PostsListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts] = useState(initialPosts); // store initial data

  const filteredPosts = useMemo(() => {
    if (!searchTerm) return posts;
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [posts, searchTerm]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <article key={post.id} className="border rounded p-4 shadow-sm">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-500">Author: {usersMap[post.userId] || 'Unknown'}</p>
            <p className="mt-2">{post.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
};
