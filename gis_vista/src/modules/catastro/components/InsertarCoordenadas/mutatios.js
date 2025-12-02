import gql from 'graphql-tag';

export const INSERTAR_COORDENADAS = gql`
    mutation insertarCoordenadas( $data: [JSON!]!, $srid: Int!) {
        sistema {
            insertarCoordenadas( data: $data, srid: $srid) {
                ok
                mensaje
            }
        }
    }
`;

