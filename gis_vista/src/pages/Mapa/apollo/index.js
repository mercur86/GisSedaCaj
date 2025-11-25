import React from 'react';
import { ApolloProvider as ApolloProviderLegacy } from "react-apollo";
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';

export const MyApolloProvider = ({ client, children }) => (
    <ApolloProviderLegacy client={client}>
        <ApolloProvider client={client}>
            <ApolloHooksProvider client={client}>
                {children}
            </ApolloHooksProvider>
        </ApolloProvider>
    </ApolloProviderLegacy>
)