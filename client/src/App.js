import React from 'react';
import { SnackbarProvider } from 'notistack';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CookieConsent from 'react-cookie-consent';
import { Provider } from 'react-redux';

import SideMenu from './components/layout/SideMenu';
import Notifications from './components/layout/Notifications';
import store from './store';

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: { main: '#2d2d2d' },
      secondary: { main: '#f50057' },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 770,
        lg: 1280,
        xl: 1920,
      },
    },
  });

  return (
    <SnackbarProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Notifications />
          <SideMenu />
        </ThemeProvider>
      </Provider>
      <CookieConsent
        location="bottom"
        buttonText="I Understand"
        cookieName="cookiesAllowed"
        style={{ background: '#2B373B', zIndex: 9999 }}
        buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
        expires={150}
      >
        This website uses cookies to enhance the user experience.{' '}
      </CookieConsent>
    </SnackbarProvider>
  );
}

export default App;
