'use client';

import { useQuery } from '@tanstack/react-query';

import { PostItemWithDelete } from './PostItemWithDelete';

import { fetchPosts } from '@/lib/api';

import { PostCard } from '@/lib/types';

export const PostsListQuery = () => {
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<PostCard[]>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (isLoading) return <div className="p-4">Loading posts (TanStack Query)...</div>;
  if (isError)
    return (
      <div className="p-4 text-red-500">
        Error: {error instanceof Error ? error.message : 'Unknown error'}
        <button onClick={() => refetch()} className="ml-2 bg-red-500 text-white px-2 py-1 rounded">
          Retry
        </button>
      </div>
    );

  return (
    <ul className="space-y-2 p-4">
      {posts?.map((post) => (
        <PostItemWithDelete key={post.id} post={post} />
      ))}
    </ul>
  );
};
