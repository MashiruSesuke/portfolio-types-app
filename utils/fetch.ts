// ===== Async State Types

// LoadingState - represents the loading state
type LoadingState = { status: 'loading' };

// SuccessState<T> - represents a successful state with data
type SuccessState<T> = { status: 'success'; data: T };

// ErrorState - represents an error state
type ErrorState = { status: 'error'; error: string };

// fetchData<T> - type-safe fetch wrapper that returns typed JSON response
// Throws an error if the response status is not ok
export async function fetchData<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data as T; // typed response as a safety measure
}

// updateItem<T> - immutably updates an item in an array by id
// Returns a new array with the updated item
export function updateItem<T extends { id: number }>(
  items: T[],
  updatedItem: T
): T[] {
  return items.map(item => (item.id === updatedItem.id ? updatedItem : item ));
}

// AsyncState<T> - union type representing all possible async states
export type AsyncState<T> = LoadingState | SuccessState<T> | ErrorState;

// handleAsyncState<T> - reducer function that handles different async states
// Returns a string representation of the current state
export function handleAsyncState<T>(state: AsyncState<T>) {
  switch (state.status) {
    case 'loading': return 'Loading...';
    case 'success': return `Data: ${state.data}`;
    case 'error': return `Error: ${state.error}`;
  }
}