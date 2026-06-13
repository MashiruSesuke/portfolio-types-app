import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true, // allows to use describe/it without import
    environment: 'node', // test utils
    include: ['**/*.test.ts', '**.spec.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
