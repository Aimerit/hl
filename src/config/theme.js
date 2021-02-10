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
        fontFamily: '"Montserrat", sans-serif',
        color: '#1C1C1C'
      }
    }
  }
});
