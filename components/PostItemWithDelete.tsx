'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '@/lib/api';
import { PostCard } from '@/lib/types';

export const PostItemWithDelete = ({ post }: { post: PostCard }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deletePost,
    onMutate: async (deletedPostId) => {
      // cancel all current refetch to prevent rewriting optimistic update
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      // store current data in cache for possible rollback
      const previousPosts = queryClient.getQueryData<PostCard[]>(['posts']);

      // optimistic update the cache: delete the post
      queryClient.setQueryData<PostCard[]>(['posts'], (old) =>
        old?.filter((p) => p.id !== deletedPostId)
      );

      // return context for onError
      return { previousPosts };
    },
    onError: (err, _deletedPostId, context) => {
      // rollback: restore previous list
      queryClient.setQueryData(['posts'], context?.previousPosts);
      console.error('Failed to delete post', err);
    },
    onSettled: () => {
      // when done (success or error) update the cache to get the latest data from server
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const handleDelete = () => {
    mutation.mutate(post.id);
  };

  return (
    <li className="border-b pb-2 flex justify-between items-start">
      <div>
        <h3 className="font-semibold">{post.title}</h3>
        <p className="text-sm text-gray-600">{post.body}</p>
      </div>
      <button
        onClick={handleDelete}
        disabled={mutation.isPending}
        className="ml-2 bg-red-500 text-white px-2 py-1 rounded text-sm disabled:opacity-50"
      >
        {mutation.isPending ? 'Deleting...' : 'Delete'}
      </button>
    </li>
  );
};
