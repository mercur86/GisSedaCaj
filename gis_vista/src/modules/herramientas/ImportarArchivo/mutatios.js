import gql from 'graphql-tag';

export const IMPORTAR_CAPA = gql`
    mutation importarCapa($capaId: Int!, $data: [JSON!]!, $srid: Int!) {
        sistema {
            importarCapa(capaId: $capaId, data: $data, srid: $srid) {
                ok
                mensaje
            }
        }
    }
`;

