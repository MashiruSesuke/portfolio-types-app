import { describe, it, expect, vi } from 'vitest';
import { fetchData, updateItem, handleAsyncState } from './fetch';

const apiPath = 'https://api.example.com/data';

describe('fetchData', () => {
  it('should return data when successful', async () => {
    const mockResponse = { data: 'mocked-data' };

    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const result = await fetchData<{ data: string }>(apiPath);

    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(apiPath);
  });

  it('should throw error on non-ok response', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 404,
    } as Response);

    await expect(fetchData<{ data: string }>(apiPath)).rejects.toThrow('HTTP 404');
  });

  it('should handle network errors', async () => {
    const mockError = new Error('Network error');
    vi.spyOn(global, 'fetch').mockRejectedValue(mockError);

    await expect(fetchData<{ data: string }>(apiPath)).rejects.toThrow('Network error');
  });
});

describe('handleAsyncState', () => {
  it('should return loading state', () => {
    expect(handleAsyncState({ status: 'loading' })).toBe('Loading...');
  });

  it('should return success state', () => {
    expect(handleAsyncState({ status: 'success', data: 'test' })).toBe('Data: test');
  });

  it('should return error state', () => {
    expect(handleAsyncState({ status: 'error', error: 'Failed' })).toBe('Error: Failed');
  });
});

describe('updateItem', () => {
  it('should update item by id', () => {
    const items = [
      { id: 1, name: 'old' },
      { id: 2, name: 'test' },
    ];
    const updated = [{ id: 1, name: 'new' }];

    expect(updateItem(items, updated[0])).toEqual([
      { id: 1, name: 'new' },
      { id: 2, name: 'test' },
    ]);
  });
});
