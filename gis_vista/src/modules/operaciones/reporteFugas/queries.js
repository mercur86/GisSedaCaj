import gql from 'graphql-tag';

export const LISTA_FUGAS = gql`
query fugasANF($idProvincia: Int, $idDistrito: [Int!], $fechaInicial: String!, $fechaFinal: String!, $filtroFecha: String!) {
  operaciones {
    fugasAnf(idProvincia: $idProvincia, idDistrito: $idDistrito, fechaInicial: $fechaInicial, fechaFinal: $fechaFinal, filtroFecha: $filtroFecha) {
      id
      lugar_fuga
      descripcion
      referencia_ubicacion
      provincia
      distrito
      fecha_inicio
      fecha_solucion
      codigo_elemento_afectado
      diametro_tuberia
      volumen_perdido_agua
      nombre_usuario_registro
      fecha_solucion_timestamp: fecha_solucion_fuga,
      fecha_inicio_timestamp: fecha_inicio_fuga
    }
  }
}
`;

export const ELIMINAR_FUGAS = gql`
mutation eliminarFugas($idsFugas: [Int!]!) {
  operaciones {
    eliminarFugas(idsFugas: $idsFugas)
  }
}
`;