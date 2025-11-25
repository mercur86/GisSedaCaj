import React from 'react';
import FormularioLogin from '../../modules/global/components/FormularioLogin';
import { MyApolloProvider } from '../Mapa/apollo';
import client from './apollo/client';

const Login = () => {
    return (
        <MyApolloProvider client={client}>
            <FormularioLogin />
        </MyApolloProvider>
    );
}

export default Login;