import gql from 'graphql-tag';

export const IMPORTAR_CAPA = gql`
    mutation importarCapa($capaId: Int!, $data: [JSON!]!) {
        sistema {
            importarCapa(capaId: $capaId, data: $data) {
                ok
                mensaje
            }
        }
    }
`;
