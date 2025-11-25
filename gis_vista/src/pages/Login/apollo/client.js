import ApolloClient from 'apollo-boost';
import { PUBLIC_GRAPHQL_API_URL } from '../../../config';
export default new ApolloClient({
    uri: PUBLIC_GRAPHQL_API_URL,
    credentials: 'include'
});