import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import useCurrentTheme from './theme/useCurrentTheme';
import AppRoutes from './routing/AppRoutes';
import IntializeAxios from './utils/Api';
import { API_ENDPOINTS } from './const/ApiEndpoints';
import PageLevelLoader from './components/PageLevelLoader';

function App() {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useCurrentTheme('Light');
  IntializeAxios({ enqueueSnackbar, API_ENDPOINTS });
  return (
    <ThemeProvider theme={theme}>
        <PageLevelLoader />
        <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
