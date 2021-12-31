import { useRoutes } from 'react-router-dom';
import routes from './router';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import ThemeProvider from './theme/ThemeProvider';
import { CssBaseline } from '@mui/material';

import Amplify from 'aws-amplify';
import awsconfig from './aws-export';

const App = () => {

  const content = useRoutes(routes);

  Amplify.configure(awsconfig);

  window.addEventListener('hashchange', e => {
    console.log('URL hash changed', e);
  });
  window.addEventListener('popstate', e => {
    console.log('State changed', e);
  });
  

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {content}
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
