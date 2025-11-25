import gql from 'graphql-tag';

export const LECTURAS_CONTROL_CALIDAD = gql`
query LecturasControlCalidad($codigoPunto: String!, $tipoFuente: Int!) {
  operaciones {
    lecturasPuntoControlCalidad(codigoPunto: $codigoPunto, tipoFuente: $tipoFuente) {
      fecha_lectura
      parametro
      valor
    }
  }
}
`;