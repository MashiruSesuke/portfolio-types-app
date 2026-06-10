'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NewPost } from '@/lib/types';

async function createPostApi(newPost: NewPost) {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPost),
  });
  if (!res.ok) throw new Error('Failed to create post');
  return res.json();
}

export const QuickPostForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPostApi,
    // TODO: onMutate - I can add optimistic update here + form validation
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setTitle('');
      setBody('');
    },
  });

  const handleSumbit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    mutation.mutate({ title, body, userId: 1 });
  };

  return (
    <form onSubmit={handleSumbit} className="mb-8 p-4 border rounded">
      <h3 className="text-lg form-semibold mb-2">Create new post</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={2}
        className="border p-2 w-full mb-2 rounded"
      />
      <button
        type="submit"
        disabled={mutation.isPending}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        {mutation.isPending ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  );
};
