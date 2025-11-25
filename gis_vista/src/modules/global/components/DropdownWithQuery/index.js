import React from 'react';
import { Query } from 'react-apollo';
import Dropdown from '../Dropdown';

const getProperty = (obj, route) => {
    const props = route.split(".");
    return props.reduce((acc = {}, currVal) => acc[currVal], obj);
}

const DropdownWithQuery = ({
    query,
    queryOptions,
    fetchPolicy,
    valuesProperty,
    ...otherDropdownProps
}) => {
    return (
        <Query
            query={query}
            {...queryOptions}
        >
            {({ data, loading, error }) => {

                let options = [];
                if (data) options = getProperty(data, valuesProperty) || [];

                return (
                    <Dropdown
                        disabled={loading || Boolean(error) || !options.length}
                        options={options}
                        {...otherDropdownProps}
                    />
                );
            }}
        </Query>
    );
}

export default DropdownWithQuery;