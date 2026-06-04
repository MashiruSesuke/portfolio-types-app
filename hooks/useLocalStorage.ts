import { useState, useEffect } from 'react';

/**
 * Custom hook for persisting state in localStorage.
 * Handles SSR/CSR hydration to prevent mismatches.
 *
 * @template T - The type of the stored value
 * @param key - The localStorage key to use
 * @param initialValue - The default value if no stored value exists
 * @returns Tuple containing [storedValue, setValue, isMounted]
 *
 * @example
 * ```ts
 * const [name, setName, isMounted] = useLocalStorage('name', 'Guest');
 *
 * useEffect(() => {
 *   if (isMounted) {
 *     console.log('Hydrated from localStorage:', name);
 *   }
 * }, [isMounted, name]);
 * ```
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value, initialized with initialValue
  // Note: Actual localStorage value will be loaded after mount
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Track mount status to handle SSR/CSR hydration
  const [isMounted, setIsMounted] = useState(false);

  /**
   * Load value from localStorage after component mounts.
   * This useEffect runs only on the client side to avoid SSR issues.
   *
   * Note: We call setState synchronously here for initial hydration.
   * The eslint disable is intentional - this is a one-time initialization,
   * not a continuous synchronization that would cause cascading renders.
   */
  useEffect(() => {
    const readValue = (): T => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? (JSON.parse(item) as T) : initialValue;
      } catch (error) {
        console.warn(`Error reading localStorage key "${key}":`, error);
        return initialValue;
      }
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStoredValue(readValue());
    setIsMounted(true);
  }, [key, initialValue]);

  /**
   * Update the stored value in both state and localStorage.
   * Supports both direct values and updater functions.
   *
   * @param value - The new value or a function to compute it
   *
   * @example
   * ```ts
   * // Direct value
   * setName('John');
   *
   * // Updater function
   * setCount(prev => prev + 1);
   * ```
   */
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  /**
   * Returns a tuple with:
   * - storedValue: Current value from localStorage (or initialValue before hydration)
   * - setValue: Function to update the stored value
   * - isMounted: Boolean indicating if component has mounted (useful for SSR)
   */
  return [storedValue, setValue, isMounted] as const;
}
