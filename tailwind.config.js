/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        patterns: {
            opacities: {
                100: '1',
                80: '.80',
                60: '.60',
                40: '.40',
                20: '.20',
                10: '.10',
                5: '.05',
            },
            sizes: {
                1: '0.25rem',
                2: '0.5rem',
                4: '1rem',
                6: '1.5rem',
                8: '2rem',
                16: '4rem',
                20: '5rem',
                24: '6rem',
                32: '8rem',
            },
        },
        fontFamily: {
            inkutAntiqua: ['Inknut Antiqua', 'sans-serif'],
            manrope: ['Manrope', 'sans-serif'],
        },
    },

    plugins: [require('daisyui'), require('tailwindcss-animate')],
    daisyui: {
        themes: ['forest'],
    },
};
