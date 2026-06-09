import { PostForm } from '@/components/PostForm';

export const metadata = {
  title: 'Create Post',
  description: 'Create a new post using React Hook Form + Zod + Server Actions',
};

export default function CreatePostPage() {
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <PostForm />
    </div>
  );
}
