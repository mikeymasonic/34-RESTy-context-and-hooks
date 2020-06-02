import React from 'react';
import { render } from 'react-dom';
import App from './components/App/App';
import { StateProvider } from './hooks/StateProvider';

render(
  <StateProvider>
    <App />
  </StateProvider>,
  document.getElementById('root')
);
