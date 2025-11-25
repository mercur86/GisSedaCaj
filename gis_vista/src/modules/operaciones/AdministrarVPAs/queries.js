import gql from "graphql-tag";

export const LISTA_VPA = gql`
query listaVPAs($idProvincia: String, $idDistrito: String) {
    operaciones {
      listaVPAs(idProvincia: $idProvincia, idDistrito: $idDistrito) {
        id
        numero
        este
        norte
        referenciaIdentificacion: referencia_identificacion
        num_zona
      }
    }
  }  
`;

export const ACTUALIZAR_DATOS_VPA = gql`
mutation actualizarDatosVPA($id: String!, $referenciaIdentificacion: String!, $longitud: Float!, $latitud: Float!) {
  operaciones {
    actualizarDatosVPA(id: $id, referenciaIdentificacion: $referenciaIdentificacion, longitud: $longitud, latitud: $latitud) {
      id
      numero
      este
      norte
      referenciaIdentificacion: referencia_identificacion
      num_zona
    }
  }
}
`;

export const REGISTRAR_VPA = gql`
mutation registrarVPA($referenciaIdentificacion: String!, $longitud: Float!, $latitud: Float!) {
  operaciones {
    registrarVPA(referenciaIdentificacion: $referenciaIdentificacion, longitud: $longitud, latitud: $latitud) {
      id
      numero
      este
      norte
      referenciaIdentificacion: referencia_identificacion
      num_zona
    }
  }
}
`;

export const ELIMINAR_VPA = gql`
mutation eliminarVPA($idVPA: String!) {
  operaciones {
    eliminarVPA(idVPA: $idVPA)
  }
}
`;