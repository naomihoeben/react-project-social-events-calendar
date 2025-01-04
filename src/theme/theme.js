import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      100: '#FFD1DC', // Light pink
      200: '#FFA7C4', // Medium pink
      300: '#FF7FAA', // Bright pink
      400: '#FF57A0', // Vibrant pink
      500: '#FF2F8E', // Dark pink
    },
    accents: {
      yellow: '#FFEC99', // Pastel yellow
      teal: '#90E0EF', // Soft teal
    },
  },
  styles: {
    global: {
      body: {
        bg: 'brand.100', // Use one of the defined colors
       // fontFamily: "'Comic Sans MS', cursive, sans-serif", 
       // Dat werd me toch te veel ;)
        color: 'gray.800', // Default text color
      },
    },
  },
});

export default theme;
