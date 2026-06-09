'use server';

import { postSchema } from '@/lib/validation/postSchema';

export async function createPost(
  formData: FormData
): Promise<{ success: boolean; errors?: Record<string, string[]>; message?: string }> {
  // get data from FormData
  const rawData = {
    title: formData.get('title'),
    body: formData.get('body'),
    userId: formData.get('userId'),
  };

  // validation on server
  const result = postSchema.safeParse(rawData);

  if (!result.success) {
    // return validation errors in format that react-hook-form can understand
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of result.error.issues) {
      const path = issue.path.join('.');
      if (!fieldErrors[path]) {
        fieldErrors[path] = [];
      }
      fieldErrors[path].push(issue.message);
    }
    return { success: false, errors: fieldErrors };
  }

  // real seding to API (imitation)
  try {
    const res = await fetch('https://jsonplaceholder.typicode/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result.data),
    });
    if (!res.ok) throw new Error('Failed to create post');
    // in real project we can revalidate the cache here
    return { success: true, message: 'Post created successfully!' };
  } catch {
    return { success: false, message: 'Server error. Please try again later.' };
  }
}
