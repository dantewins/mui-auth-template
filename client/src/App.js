import { lazy } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

import Loadable from 'ui-component/loaders/Loadable';
import Loader from 'ui-component/loaders/Loader';
import { useCurrentUser } from './hooks/useCurrentUser';
import themes from 'themes';

const Routes = Loadable(lazy(() => import('routes')));

const App = () => {
  const { loading } = useCurrentUser(30000);

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes()}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>  
    </StyledEngineProvider>
  );
};

export default App;