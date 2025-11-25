import gql from 'graphql-tag';

export const LISTA_PARAMETROS_CALIDAD = gql`
query listaParametrosCalidad {
    operaciones {
      listaParametrosCalidad {
        id
        nombre
      }
    }
  }
`;