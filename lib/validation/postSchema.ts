import { z } from 'zod';

// validation scheme
export const postSchema = z.object({
  title: z.string().min(3, 'Title: min 3 chars').max(100),
  body: z.string().min(10, 'Content: min 10 chars'),
  userId: z.coerce.number().int().positive(),
});

export type PostFormData = z.infer<typeof postSchema>;
