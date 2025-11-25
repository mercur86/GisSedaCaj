import React from 'react';
import { APP_MAIN_DATA } from '../../graphql/queries'
import { Query } from 'react-apollo';
import AppLoading from '../../../../modules/global/components/AppLoading';
import ErrorPage from '../../../../modules/global/components/ErrorPage';

export default ({ children }) => {
    return (
        <Query
            query={APP_MAIN_DATA}
            variables={{ todos: false }}
        >
            {({ data, loading, error }) => {
                if (loading) return <AppLoading />
                if (error) return <ErrorPage error={error} />;
                return children(data);
            }}
        </Query>
    )
}