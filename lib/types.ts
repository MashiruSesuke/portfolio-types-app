// User interface - represents a user in the system
export interface User {
  id: number; // Unique user identifier
  name: string; // User's full name
  email: string; // User's email address
  age: number; // User's age in years
  isActive: boolean; // Indicates if the user account is active
  createdAt: Date; // Timestamp when the user was created
}

// Product interface - represents a product in the catalog
export interface Product {
  id: number; // Unique product identifier
  title: string; // Product name
  price: number; // Product price
  category: string; // Product category
  inStock: boolean; // Indicates if the product is available
  tags: string[]; // Product tags for filtering
}

// Post interface - represents a blog post or article
export interface Post {
  id: number; // Unique post identifier
  title: string; // Post title
  body: string; // Post content/body
  userId: number; // ID of the post author
  publishedAt?: Date; // Timestamp when the post was published
  likes?: number; // Number of likes on the post
}

// ===== Type aliases for common operations

// CreateUserInput - data required to create a new user (excludes auto-generated fields)
export type CreateUserInput = Omit<User, 'id' | 'createdAt'>;

// UpdateUserInput - data for updating an existing user (requires id, other fields optional)
export type UpdateUserInput = Partial<Omit<User, 'id'>> & { id: number };

// ProductCard - simplified product view for UI cards
export type ProductCard = Pick<Product, 'id' | 'title' | 'price' | 'inStock'>;

// PostCard - simplified post view for UI cards
export type PostCard = Pick<Post, 'id' | 'title' | 'body'>;

// NewPost - data required to create a new post (excludes auto-generated fields)
export type NewPost = Pick<Post, 'title' | 'body' | 'userId'>;

// UserCard - simplified user view for UI cards
export type UserCard = Pick<User, 'id' | 'name' | 'email'>;

// TagCountMap - maps tag names to their occurrence counts
export type TagCountMap = Record<string, number>;

// PostContent - post data without metadata (for editing/display purposes)
export type PostContent = Omit<Post, 'id' | 'publishedAt' | 'likes'>;

// ===== Advanced types

// ===== Mapped Types

// MyReadonly<T> - makes all properties in T readonly
export type MyReadonly<T> = { readonly [K in keyof T]: T[K] };

// MyPartial<T> - makes all properties in T optional
export type MyPartial<T> = { [K in keyof T]?: T[K] };

// Nullable<T> - makes all properties in T nullable (accepts null or undefined)
export type Nullable<T> = { [K in keyof T]: T[K] | null };

// ===== Conditional Types

// IsFunction<T> - checks if T is a function type
export type IsFunction<T> = T extends (...args: unknown[]) => unknown ? true : false;

// MyReturnType<T> - extracts the return type of a function (alternative to ReturnType)
export type MyReturnType<T> = T extends (...args: unknown[]) => infer R ? R : never;

// ArrayElement<T> - extracts the element type of an array, or returns T if not an array
export type ArrayElement<T> = T extends (infer U)[] ? U : T;

// ===== Keyof + Indexed Access + Conditional Types

// GetFieldType<T, K> - extracts the type of a property by its name
// Example: GetFieldType<User, 'email'> -> string
export type GetFieldType<T, K extends keyof T> = T[K];

// MakeOptional<T, K> - makes specified properties K optional, keeps others unchanged
// Example: MakeOptional<User, 'age' | 'isActive'>
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// ===== String Transformation Types

// SnakeToCamelCase<S> - converts a snake_case string to camelCase
// Example: "user_id" -> "userId"
export type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
  : S;

// SnakeToCamel<T> - transforms all keys in an object from snake_case to camelCase
// Example: { user_id: number } -> { userId: number }
export type SnakeToCamel<T> = {
  [K in keyof T as SnakeToCamelCase<K & string>]: T[K];
};

// ===== Deep Transformation Types

// DeepReadonly<T> - recursively makes all properties in T and nested objects readonly
// Handles arrays and objects at any depth
export type DeepReadonly<T> = T extends (infer U)[]
  ? readonly DeepReadonly<U>[]
  : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;
