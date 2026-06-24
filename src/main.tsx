import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { init as initContentful } from '@contentful/app-sdk';

// Check if we are running inside an iframe (like Contentful's App/Extension container)
const isIframe = typeof window !== 'undefined' && window.self !== window.top;

if (isIframe) {
  try {
    initContentful((sdk) => {
      console.log('Contentful App SDK initialized successfully');
      // Automatically adjust iframe height to fit the content inside Contentful
      const anySdk = sdk as any;
      if (anySdk.window && typeof anySdk.window.startAutoResizer === 'function') {
        anySdk.window.startAutoResizer();
      }
    });
  } catch (error) {
    console.error('Failed to initialize Contentful App SDK:', error);
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
