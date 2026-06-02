// Converts a snake_case string to camelCase
function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

// transformKeysToCamel - transforms object keys from snake_case to camelCase
// Generic function that preserves the transformed type structure
export function transformKeysToCamel<T>(obj: Record<string, unknown>): T {
  const result: Record<string, unknown> = {};

  for (const key in obj) {
    const camelKey = toCamelCase(key);
    result[camelKey] = obj[key];
  }

  return result as T;
}