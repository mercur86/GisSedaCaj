import gql from "graphql-tag";

export const CISTERNA_LIST = gql`
query cisternas {
  operaciones {
    listaCisternas {
      id
      placa
      chofer
      horaInicial24: hora_inicial
      horaFinal24: hora_final
      horaInicial12: hora_inicial_texto
      horaFinal12: hora_final_texto
      horario
      direccion
      zonasAbastecidas: zonas_abastecidas
      longitud
      latitud
    }
  }
} 
`;

export const ADD_CISTERNA = gql`
mutation registrarCisterna($placa: String!, $chofer: String!, $horaInicial: String!, $horaFinal: String!, $direccion: String!, $zonasAbastecidas: String!, $longitud: Float!, $latitud: Float!) {
  operaciones {
    registrarCisterna(placa: $placa, chofer: $chofer, horaInicial: $horaInicial, horaFinal: $horaFinal, direccion: $direccion, zonasAbastecidas: $zonasAbastecidas, longitud: $longitud, latitud: $latitud) {
      id
    }
  }
}
`;

export const DELETE_CISTERNA = gql`
mutation eliminarCisterna($idCisterna: String!){
  operaciones{
    eliminarCisterna(idCisterna:$idCisterna)
  }
}
`;

export const ACTUALIZAR_INFO_CISTERNA = gql`
mutation actualizarInfoCisterna($id: String!, $placa: String!, $chofer: String!, $horaInicial: String!, $horaFinal: String!, $direccion: String!, $zonasAbastecidas: String!, $longitud: Float!, $latitud: Float!) {
  operaciones {
    actualizarInfoCisterna(id: $id, placa: $placa, chofer: $chofer, horaInicial: $horaInicial, horaFinal: $horaFinal, direccion: $direccion, zonasAbastecidas: $zonasAbastecidas, longitud: $longitud, latitud: $latitud) {
      id
      placa
      chofer
      horaInicial24: hora_inicial
      horaFinal24: hora_final
      horaInicial12: hora_inicial_texto
      horaFinal12: hora_final_texto
      horario
      direccion
      zonasAbastecidas: zonas_abastecidas
      longitud
      latitud
    }
  }
}
`;