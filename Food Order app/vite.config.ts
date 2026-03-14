import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		checker({
			// Włącza sprawdzanie TypeScriptu w osobnym procesie
			typescript: true,
			// Opcjonalnie: jeśli używasz ESLint, możesz go tu też dodać
			// eslint: { lintCommand: 'eslint "./src/**/*.{ts,tsx}"' },
		}),
	],
});
