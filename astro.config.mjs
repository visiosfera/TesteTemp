import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    preview: {
		port: 4321,
		host: true,
	},
	server: {
		host: true,
		port: 4321
	}
});
