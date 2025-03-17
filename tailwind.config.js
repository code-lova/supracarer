/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      xs: ['12px', '16px'],
      sm: ['15px', '20px'],
      base: ['18px', '19.5px'],
      lg: ['18px', '21.94px'],
      xl: ['20px', '24.38px'],
      '2xl': ['24px', '29.26px'],
      '3xl': ['28px', '50px'],
      '4xl': ['48px', '58px'],
      '6xl': ['68px', '78px'],
      '8xl': ['96px', '106px']
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "contact": "url('/assets/shape/contact-shap1.svg')",
        "footer": "url('/assets/images/footer-bg.png')",
        "news-letter": "url('/assets/images/news-letter-bg.png')",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          'contact': "url('/assets/shape/contact-shape1.svg')"
      },
      fontFamily: {
        palanquin: ['Palanquin', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        'haven-blue': "#013e5b",
        'carer-green': "#3cb148",
        "ever-green": "#006838",
        "slate-gray": "#6D6D6D",
        "carer-blue": "#2c9ace",
        "custom-green": "#428f73",
        "custom-white": "#ffff",
        "custom-dark": "#121211",
        "tranquil-teal": "#088272",
      },
      boxShadow: {
        '3xl': '0 10px 40px rgba(0, 0, 0, 0.1)',
        'shadow-1': '10px 10px 19px #1c1e22, -10px -10px 19px #262a2e',
        'shadow-2': 'inset 21px 21px 19px #181a1d, inset -21px -21px 19px #202225',
        'inner-shadow': '1px 4px 2px -3px rgba(0, 0, 0, 0.7) inset, -1px -3px 3px -2px rgba(255, 255, 255, 0.2) inset',
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 20s linear infinite",
      },
      
    },
  },
  plugins: [],
};
