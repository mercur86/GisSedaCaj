import React from "react";
import { Query } from "react-apollo";

export default () => {
    return (
        <Query
            query={GET_DISTRITOS_PROVINCIAS}
        >
            {() => {

            }}
        </Query>
        <span></span>
    );
}