'use client';

export default function PostsError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-4 text-red-500">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()} className="mt-2 bg-red-500 text-white px-3 py-1 rounded">
        Try again
      </button>
    </div>
  );
}
