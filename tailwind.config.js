import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
    fontFamily: {
      logo: ["basic-sans", "sans-serif"],
      body: ["basic-sans", "sans-serif"],
    },
    colors: {
      transparent: colors.transparent,
      white: colors.white,
      gray: colors.gray,
      slate: colors.slate,
      blue: {
        DEFAULT: "#20AEE3",
        light: "#4BC0EC",
      },
      black: colors.black,
    },
    screens: {
      ...defaultTheme.screens,
      xs: "375px",
    }
  },
  plugins: [],
}

