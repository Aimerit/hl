import { extendTheme } from '@chakra-ui/react';

export default extendTheme({
  colors: {
    primary: {
      100: '#706CB7',
      200: '#464194',
      300: '#38329A',
      400: '#101F78',
      500: '#292295',
      600: '#464194',
      700: '#08145A',
      800: '#06114A',
      900: '#00003A'
    }
  },

  styles: {
    global: {
      body: {
        color: '#111111',
        fontSize: '0.75rem',
        fontFamily: "'Montserrat', sans-serif"
      }
    }
  },

  fontSizes: {
    xs: '10px',
    sm: '11px',
    md: '12px',
    lg: '14px',
    xl: '17px',
    '2xl': '20px',
    '3xl': '23px',
    '4xl': '32px',
    '5xl': '44px',
    '6xl': '60px'
  },

  components: {
    FormLabel: {
      baseStyle: {
        fontWeight: 500
      }
    },

    Table: {
      baseStyle: {
        th: {
          fontWeight: 600,
          textTransform: 'none',
          fontFamily: "'Montserrat', sans-serif"
        }
      }
    }
  }
});
