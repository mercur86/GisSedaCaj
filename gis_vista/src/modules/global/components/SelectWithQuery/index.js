import React from 'react';
import { Query } from 'react-apollo';

const getProperty = (obj, route) => {
    const props = route.split(".");
    return props.reduce((acc = {}, currVal) => acc[currVal], obj);
}

const ProtoSelect = ({ options, optionLabel, optionValue, ...otherSelectProps }) => {

    const labelKey = optionLabel || "label",
        valueKey = optionValue || "value";
    return (
        <select
            {...otherSelectProps}
        >
            {options.map((e) =>
                <option
                    key={e[labelKey]}
                    value={e[valueKey]}
                >
                    {e[labelKey]}
                </option>
            )}
        </select>
    )
}

const SelectWithQuery = ({ query, variables = {}, valuesProperty, ...otherSelectProps }) => (
    <Query
        query={query}
        variables={variables}
    >
        {({ data, loading, error }) => {
            let values = [];
            if (data) values = getProperty(data, valuesProperty) || [];
            return (
                <ProtoSelect
                    options={values}
                    disabled={loading || error}
                    {...otherSelectProps}
                />
            );
        }}
    </Query>
)

export default SelectWithQuery;