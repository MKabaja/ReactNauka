import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker'; // <--- Import

export default defineConfig({
	plugins: [
		react(),
		checker({
			typescript: true, // <--- Włącz sprawdzenie TS
		}),
	],
});
