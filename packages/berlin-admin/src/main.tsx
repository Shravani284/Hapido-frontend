import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './BerlinAdmin.tsx';
import './index.scss';
import { Provider } from 'react-redux';
import Store from './store/Store.ts';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { i18n } from 'berlin-common';
import { ConfigProvider } from './contexts/ConfigContext.tsx';
import DeploymentErrorBoundary from './DeploymentErrorBoundary.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <I18nextProvider i18n={i18n}>
    <React.StrictMode>
      <Provider store={Store}>
        <ConfigProvider>
          <BrowserRouter>
            <DeploymentErrorBoundary>
              <App />
            </DeploymentErrorBoundary>
          </BrowserRouter>
        </ConfigProvider>
      </Provider>
    </React.StrictMode>
  </I18nextProvider>
);
