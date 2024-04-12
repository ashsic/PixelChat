import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApolloClient, InMemoryCache, useReactiveVar, ApolloProvider, createHttpLink } from '@apollo/client';
import { cache } from "./graphql/cache.js"
import { isLoggedInVar } from './graphql/cache';

const link = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'include'
});

const client = new ApolloClient({
  cache: cache,
  link
});





// function VerifyLogin() {
//   const isLoggedIn = useReactiveVar(isLoggedInVar);
//   const { loading, error, data } = useQuery(VERIFY_JWT);
//   if (loading) return false;
//   if (error) {
//     return false;
//   }
//   return true;
// }

// //isLoggedInVar(verifyLogin())

// //if (loading)


// console.log('initial state',isLoggedIn)

// if (error) return <Login />;


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
);
