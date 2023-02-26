/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                cyan: {
                    100: "#81d2e3",
                    200: "#81bed2",
                },
            },
        },
    },
    plugins: [],
};
