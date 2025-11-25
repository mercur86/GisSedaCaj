import gql from "graphql-tag";

export const LISTAR_ESTADO_USER_SIN_SUMINISTRO = gql`
  query listaEstadoUsuarioSinSuministro {
    catastro {
      listaEstadoUsuarioSinSuministro {
        nombre
      }
    }
  }
`;

export const LISTAR_TIPO_CONSTRUCCION = gql`
  query listaTipoConstruccion {
    catastro {
      listaTipoConstruccion {
        nombre
      }
    }
  }
`;
