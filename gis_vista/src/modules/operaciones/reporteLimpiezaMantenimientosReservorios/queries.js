import gql from 'graphql-tag';

export const LISTA_LIMP_MANT_RESERVORIOS = gql`
query limpMantReserorios($idProvincia: Int, $idDistrito: Int, $fechaInicial: String!, $fechaFinal: String!) {
  operaciones {
    limpMantReserorios(idProvincia: $idProvincia, idDistrito: $idDistrito, fechaInicial: $fechaInicial, fechaFinal: $fechaFinal) {
      provincia_s
      distrito_s
      reservorio_s
      capacidad_reservorio_s
      perdida_estimada_s
      fecha_limpieza_s
    }
  }
}
`;
