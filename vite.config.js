import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path'
import { copy } from 'vite-plugin-copy'

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(),
    copy({
      targets: [
        {
          src: path.resolve('node_modules/@shoelace-style/shoelace/dist/assets'),
          dest: 'static/shoelace'
        }
      ],
      hook: 'buildStart'
    })
 ],
	server: {
  		port: 5173,
  		host: '0.0.0.0'
	}
});
