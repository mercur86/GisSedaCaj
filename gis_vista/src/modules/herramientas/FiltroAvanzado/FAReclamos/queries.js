import gql from 'graphql-tag';

// QUERIES TUBERIA
export const LISTA_TIPO_RECLAMO_PROBLEMAS = gql`
query listaTipoReclamoProblema {
    operaciones{
      listaTipoReclamoProblema {
        nombre
        id
      }
    }
  }
`;

export const LISTA_ESTADO_RECLAMO_PROBLEMAS = gql`
query listaEstadoReclamoProblema {
    operaciones{
      listaEstadoReclamoProblema {
        nombre
        id
      }
    }
  }
`;