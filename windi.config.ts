import { defineConfig } from 'windicss/helpers'
import typography from 'windicss/plugin/typography'
import lineClamp from 'windicss/plugin/line-clamp'
import forms from 'windicss/plugin/forms'

export default defineConfig({
  darkMode: 'class',
  attributify: true,
  plugins: [typography, lineClamp, forms],
  shortcuts: {
    'text-neon':
      'text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-200',
    glass:
      'backdrop-filter backdrop-blur-lg backdrop-saturate-[180%] filter drop-shadow-xl',
    btn: `
      font-semibold h-12 px-6 rounded-lg inline-flex items-center justify-center
      sm:w-auto
    `,
    'btn-primary': `
      bg-sky-500 text-white
      border border-slate-200 border-opacity-30
      dark:bg-sky-500 dark:text-slate-200
      hover:bg-sky-400 hover:border-opacity-10 dark:hover:bg-opacity-10
      focus:outline-none focus:ring-2 focus:ring-slate-400 focus:right-offset-2 focus:right-offset-slate-50
    `,
    'btn-secondary': `
      bg-slate-200 text-slate-800
      border border-slate-200 border-opacity-30
      dark:bg-white dark:text-slate-200
      hover:bg-sky-400 hover:text-white hover:border-opacity-10 dark:hover:bg-opacity-10
      focus:outline-none focus:ring-2 focus:ring-slate-400 focus:right-offset-2 focus:right-offset-slate-50
    `,
    'btn-blur':
      'backdrop-filter backdrop-blur-sm backdrop-saturate-[180%] dark:bg-opacity-33',
    'btn-icon': `p-2 hover:bg-slate-200 dark:hover:bg-slate-800 dark:hover:bg-opacity-50
      text-slate-900 dark:text-slate-200
      rounded-md !outline-none transition-all duration-200 ease-in-out
    `,
    'card-blur': 'backdrop-filter backdrop-blur-lg backdrop-saturate-[180%]'
  }
})
