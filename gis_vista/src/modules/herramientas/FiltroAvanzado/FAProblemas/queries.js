import gql from 'graphql-tag';

// QUERIES TUBERIA
export const LISTAR_TIPOLOGIA_PROBLEMAS = gql`
query listaTipologiaProblema($area: String!) {
  operaciones{
    listaTipologiaProblema(area:$area) {
      nombre
      id
    }
  }
}
`;

export const LISTAR_DETALLE_PROBLEMAS_DE_TIPOLOGIA = gql`
query listaDetalleProblema($area:String!$idsTipologia: [Int!]!)
{
  operaciones{
    listaDetalleProblema(area:$area,idsTipologia:$idsTipologia){
      id
      nombre
    }
  }
}
`;

export const LISTA_TIPO_PROBLEMAS = gql`
query listaTipoProblema {
    operaciones{
      listaTipoProblema {
        nombre
        id
      }
    }
  }
`;

export const LISTA_SECTORES_COMERCIAL = gql`
query listaSectorComercial {
  operaciones{
    listaSectorComercial {
      nombre
      id
    }
  }
}
`;

export const LISTA_ESTADOS_USUARIO_I3 = gql`
query listaEstadosUsuarioI3 {
  operaciones{
    listaEstadosUsuarioI3 {
      nombre
      id
    }
  }
}
`;