import { Suspense } from 'react';

import { PostsListSuspense } from '@/components/PostsListSuspence';
import { UsersList } from '@/components/UserList';
import { UsersListSkeleton } from '@/components/UsersListSkeleton';

export const metadata = {
  title: 'Dashboard - Streaming SSR',
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard (streaming SSR)</h1>
      <p className="mb-6 text-gray-600">
        This page demostrates streaming. Components below load independently with their own
        skeletons. (works only in production mode)
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded p-4">
          <h2 className="text-xl font-semibold mb-3">Recent users</h2>
          <Suspense fallback={<UsersListSkeleton />}>
            <UsersList />
          </Suspense>
        </div>

        <div className="border rounded p-4">
          <h2 className="text-xl font-semibold mb-3">Recent posts</h2>
          <Suspense fallback={<PostsListSuspense />}>
            <PostsListSuspense />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
