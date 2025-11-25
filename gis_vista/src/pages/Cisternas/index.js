import React, { useEffect } from 'react';
import App from './App';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import $ from 'jquery';
import ApolloProvider from './ApolloProvider';

export default () => {
    useEffect(() => {
        $('[data-toggle="tooltip"]').tooltip();
    }, []);

    return (
        <ApolloProvider>
            <App />
        </ApolloProvider>
    );
}