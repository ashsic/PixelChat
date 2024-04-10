import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';

const link = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'include'
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
);
