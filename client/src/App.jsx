import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Wrapper } from '@crystallize/react-dialog';
import {  useRoutes } from 'react-router-dom';
import theme from './customizer/theme';
import RTL from './layout/RTL';
import Router from './Route/Router';

function App() {
  const routing = useRoutes(Router);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Wrapper />
      <RTL direction='rtl'>
          {routing}
      </RTL>
    </ThemeProvider>

  );
}

export default App;
