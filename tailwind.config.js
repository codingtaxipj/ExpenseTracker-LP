/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'pupl': '#7d14b9',
      'black': '#000',
      'util': '#0047AB',
      'travel': '#1F51FF',
      'food': '#E49B0F',
      'shop': '#29a8ab',
      'health': '#880808',
      'insurance': '#31473A',
      'loan': '#228B22',
      'edu': '#8d5524 ',
      'gift': '#F33A6A',
      'ent': '#808000',
      'personal': '#5D3FD3',
      'tax': '#834333',
      'misc': '#000',
      'formInput': "#f5f5f5",
      "expense" : "#0F52BA",
      "income" : "#228B22",
    },
    fontFamily: {
      'pop-r': 'Popins-Regular',
      'pop-i': 'Popins-Italic',
      'pop-b': 'Popins-Bold',
      'pop-sb': 'Popins-semiBold',
      'pop-m': 'Popins-Medium',
    },
    extend: {
    },
  },
  plugins: [],
}