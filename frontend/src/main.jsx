import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'react-image-crop/dist/ReactCrop.css';
import { 
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  split
} from '@apollo/client';
import { cache } from "./graphql/cache.js"
import { Router } from './Router.jsx';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'include'
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:3000/subscriptions',
  credentials: 'include'
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);


const client = new ApolloClient({
  cache: cache,
  link: splitLink
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  </React.StrictMode>,
);
