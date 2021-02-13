import { extendTheme } from '@chakra-ui/react';

export default extendTheme({
  colors: {
    primary: {
      100: '#706CB7',
      200: '#464194',
      300: '#38329A',
      400: '#292295',
      500: '#101F78',
      600: '#0D1A65',
      700: '#08145A',
      800: '#06114A',
      900: '#00003A'
    }
  },

  styles: {
    global: {
      body: {
        color: '#1C1C1C',
        fontFamily: '"Montserrat", sans-serif'
      }
    }
  },

  fontSizes: {
    xs: '10px',
    sm: '12px',
    md: '14px',
    lg: '16px',
    xl: '18px',
    '2xl': '22px',
    '3xl': '26px',
    '4xl': '32px',
    '5xl': '44px',
    '6xl': '60px'
  },

  components: {
    FormLabel: {
      baseStyle: {
        fontWeight: 600
      }
    }
  }
});
