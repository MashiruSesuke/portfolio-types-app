import { describe, it, expect } from 'vitest';
import { toCamelCase, transformKeysToCamel } from './apiTransformer';

describe('toCamelCase', () => {
  it('should convert snake_case to camelCase', () => {
    expect(toCamelCase('user_id')).toBe('userId');
    expect(toCamelCase('first_name')).toBe('firstName');
    expect(toCamelCase('created_at')).toBe('createdAt');
  });

  it('should handle single word wothout underscore', () => {
    expect(toCamelCase('name')).toBe('name');
  });

  it('should handle multiple underscores', () => {
    expect(toCamelCase('user_created_at_date')).toBe('userCreatedAtDate');
  });
});

describe('transformKeysToCamel', () => {
  it('should transform all keys in a flat object', () => {
    const input = { user_id: 1, first_name: 'John', last_name: 'Doe' };
    const expected = { userId: 1, firstName: 'John', lastName: 'Doe' };
    expect(transformKeysToCamel(input)).toEqual(expected);
  });

  it('should handle nested objects', () => {
    const input = { user: { user_id: 1 } };
    const expected = { user: { userId: 1 } };
    expect(transformKeysToCamel(input)).toEqual(expected);
  });

  it('should handle nested objects in array', () => {
    const input = { user: [{ user_id: 1 }] };
    const expected = { user: [{ userId: 1 }] };
    expect(transformKeysToCamel(input)).toEqual(expected);
  });

  it('should handle arrays with primitive values', () => {
    const input = { tags: ['hello', 'world', 42, true] };
    const expected = { tags: ['hello', 'world', 42, true] };
    expect(transformKeysToCamel(input)).toEqual(expected);
  });

  it('should handle arrays with null values', () => {
    const input = { items: [null, { user_id: 1 }, null] };
    const expected = { items: [null, { userId: 1 }, null] };
    expect(transformKeysToCamel(input)).toEqual(expected);
  });

  it('should return empty object when input is empty', () => {
    expect(transformKeysToCamel({})).toEqual({});
  });
});
