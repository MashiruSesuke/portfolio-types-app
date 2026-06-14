import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true, // allows to use describe/it without import
    environment: 'jsdom', // test utils
    setupFiles: './vitest.setup.ts',
    include: ['**/*.test.ts', '**.spec.ts', '**/*.test.tsx', '**.spec.tsx'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
