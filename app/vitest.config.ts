import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      coverage: {
        provider: 'istanbul',
        reporter: ['text', 'json', 'html', 'cobertura'],
        reportsDirectory: './coverage',
        include: ['src/**/*'],
        exclude: ['src/**/*.spec.ts', 'src/**/*.test.ts'],
      },
    },
  }),
)
