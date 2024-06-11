import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './BerlinConsumer.tsx';
import './index.scss';
import { Provider } from 'react-redux';
import Store from './store/Store.ts';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { i18n } from 'berlin-common';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { googleClientId } from '../../../urlConst.ts';
import DeploymentErrorBoundary from './DeploymentErrorBoundary.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={googleClientId}>
    <I18nextProvider i18n={i18n}>
      <React.StrictMode>
        <Provider store={Store}>
          <BrowserRouter>
            <DeploymentErrorBoundary>
              <App />
            </DeploymentErrorBoundary>
          </BrowserRouter>
        </Provider>
      </React.StrictMode>
    </I18nextProvider>
  </GoogleOAuthProvider>
);
