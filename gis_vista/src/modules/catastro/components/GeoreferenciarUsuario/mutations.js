import gql from 'graphql-tag';

export const GEOREFERENCIAR_USUARIO = gql`
mutation georeferenciarUsuario(
  $numInscripcion: Int!,
  $numSecuenciaLectura: Int,
  $coordenadas: [Float!]!
)
{
  catastro{
    georeferenciarUsuario(
      numInscripcion:$numInscripcion,
      numSecuenciaLectura: $numSecuenciaLectura,
      coordenadas: $coordenadas
    ){
      codigo_respuesta
      mensaje
    }
  }
}
`;

export const MOVER_USUARIO = gql`
mutation moverUsuario(
  $numInscripcion: Int!,
  $numSecuenciaLectura: Int,
  $coordenadas: [Float!]!
)
{
  catastro{
    moverUsuario(
      numInscripcion: $numInscripcion,
      numSecuenciaLectura: $numSecuenciaLectura
      coordenadas: $coordenadas
    )
  }
}
`;