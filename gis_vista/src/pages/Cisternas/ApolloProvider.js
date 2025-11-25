import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { PUBLIC_GRAPHQL_API_URL } from '../../config.js';

const client = new ApolloClient({
    uri: PUBLIC_GRAPHQL_API_URL,
    credentials: 'include'
});

export default ({ children }) => (
    <ApolloProvider client={client}>
        {children}
    </ApolloProvider>
)