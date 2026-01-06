import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {viteMockServe} from 'vite-plugin-mock'

export default defineConfig({
    plugins: [
        vue(),
        viteMockServe({
            mockPath: 'src/mock',
            enable: true,
        })
    ],
    server: {
        port: 3000
    }
})
