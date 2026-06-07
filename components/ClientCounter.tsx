'use client';
import { useState } from 'react';

export const ClientCounter = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="mb-4 p-2 bg-blue-100 dark:bg-blue-900 rounded">
      <p>Client-side counter: {count}</p>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="bg-blue-500 text-white px-2 py-1 rounded"
      >
        +1
      </button>
    </div>
  );
};
