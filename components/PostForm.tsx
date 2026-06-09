'use client';

import { useState } from 'react';
import { useForm, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { createPost } from '@/app/actions/postActions';

import { PostFormData, postSchema } from '@/lib/validation/postSchema';

export const PostForm = () => {
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema) as Resolver<PostFormData>,
    defaultValues: {
      title: '',
      body: '',
      userId: 1,
    },
  });

  const onSubmit = async (data: PostFormData) => {
    setServerMessage(null);
    // Transform data to FormData for Server Action
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('body', data.body);
    formData.append('userId', String(data.userId));

    const result = await createPost(formData);

    if (!result.success) {
      if (result.errors) {
        // Set errors that we're got from server into the form fields
        Object.entries(result.errors).forEach(([field, messages]) => {
          setError(field as keyof PostFormData, { type: 'server', message: messages.join(', ') });
        });
      }
      if (result.message) setServerMessage(result.message);
    } else {
      reset(); // clear the form
      setServerMessage(result.message || 'Post created!');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border p-4 rounded">
      <h2 className="text-xl font-bold">Create New Post</h2>

      <div>
        <label className="block font-medium">Title</label>
        <input
          {...register('title')}
          className="border p-2 w-full rounded"
          placeholder="Post title"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Content</label>
        <textarea
          {...register('body')}
          rows={4}
          className="border p-2 w-full rounded"
          placeholder="Write something..."
        />
        {errors.body && <p className="text-red-500 text-sm">{errors.body.message}</p>}
      </div>

      <div>
        <label className="block font-medium">User ID</label>
        <input type="number" {...register('userId')} className="border p-2 w-full rounded" />
        {errors.userId && <p className="text-red-500 text-sm">{errors.userId.message}</p>}
      </div>

      {serverMessage && (
        <p className={serverMessage.includes('success') ? 'text-green-600' : 'text-red-600'}>
          {serverMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isSubmitting ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  );
};
