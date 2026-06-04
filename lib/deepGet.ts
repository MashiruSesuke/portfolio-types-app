/**
 * Type utility for safely accessing nested object properties.
 * Provides type-safe access to nested values using string paths.
 */

/**
 * Simple function to access a direct property of an object.
 * Ensures the key is valid for the given object type.
 *
 * @typeParam T - The object type
 * @typeParam K - The key type (must be a key of T)
 * @param obj - The object to access
 * @param key - The property key to access
 * @returns The value at the specified key
 *
 * @example
 * ```ts
 * const user = { name: 'John', age: 30 };
 * const name = getNestedValue(user, 'name'); // string
 * ```
 */
export function getNestedValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

/**
 * Type utility for accessing nested object properties via dot-notation paths.
 * Recursively traverses the object type based on the path string.
 *
 * Supports paths like 'user.address.city' and returns the correct nested type.
 * Returns `never` for invalid paths to catch type errors at compile time.
 *
 * @typeParam T - The object type to traverse
 * @typeParam P - The path string (e.g., 'user.address.city')
 * @returns The type at the nested path, or `never` if path is invalid
 *
 * @example
 * ```ts
 * interface User {
 *   id: number;
 *   profile: {
 *     name: string;
 *     address: {
 *       city: string;
 *     };
 *   };
 * }
 *
 * type City = NestedPath<User, 'profile.address.city'>; // string
 * type Invalid = NestedPath<User, 'profile.email'>; // never (invalid path)
 * ```
 */
type NestedPath<T, P extends string> = P extends `${infer K}.${infer V}`
  ? K extends keyof T
    ? NestedPath<T[K], V>
    : never
  : P extends keyof T
    ? T[P]
    : never;
