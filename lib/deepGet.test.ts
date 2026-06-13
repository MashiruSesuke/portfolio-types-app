import { describe, it, expect } from 'vitest';
import { getNestedValue } from './deepGet';

describe('getNestedValue', () => {
  it('should return the value at the specified path', () => {
    const user = { name: 'John', age: 30 };
    const name = getNestedValue(user, 'name');
    expect(name).toBe('John');
  });
});
