// Converts a snake_case string to camelCase
export function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

// transformKeysToCamel - transforms object keys from snake_case to camelCase
// Generic function that preserves the transformed type structure
export function transformKeysToCamel<T>(obj: Record<string, unknown>): T {
  const result: Record<string, unknown> = {};

  for (const key in obj) {
    const camelKey = toCamelCase(key);
    const value = obj[key];

    // Recursive processing children objects
    if (value !== null && typeof value === 'object') {
      if (Array.isArray(value)) {
        // Array handling
        result[camelKey] = value.map((item) =>
          item !== null && typeof item === 'object'
            ? transformKeysToCamel(item as Record<string, unknown>)
            : item
        );
      } else {
        // Included object handling
        result[camelKey] = transformKeysToCamel(value as Record<string, unknown>);
      }
    } else {
      result[camelKey] = value;
    }
  }

  return result as T;
}
