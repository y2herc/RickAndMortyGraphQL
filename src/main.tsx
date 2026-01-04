import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { client } from './apollo.ts';
import { ApolloProvider } from '@apollo/client/react';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
  <StrictMode>
    <App />
  </StrictMode>
  </ApolloProvider>
)
