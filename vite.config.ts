import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	resolve: {
		alias: {
			$lib: path.resolve(__dirname, 'src', 'lib'),
			$root: path.resolve(__dirname),
			$src: path.resolve(__dirname, 'src'),
			$routes: path.resolve(__dirname, 'src', 'routes')
		}
	}
});
