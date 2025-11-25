import gql from 'graphql-tag';

export const ACTUALIZAR_USUARIO_FACTIBLE_POTENCIAL = gql`
mutation actualizarUsuarioFactiblePotencial(
  $gid: Int!,
  $nroFicha: Int,
  $idProv: Int!,
  $idDist: Int!,
  $lote: String!,
  $numMunicipal: String!,
  $sector: Int!,
  $idManzana: Int!,
  $nombreZona: String!,
  $manzanaMunicipal: String!,
  $loteMunicipal: String!,
  $direccionPredio: String!,
  $direccion: String!,
  $habilitacionUrbana: String!,
  $tipoUsuario: String!,
  $tipoConstruccion: String!,
  $predioHabitado: Boolean!,
  $coordenadas: [Float!]!
)
{
  catastro{
    actualizarUsuarioFactiblePotencial(
      gid:$gid,
      nroFicha: $nroFicha,
      idProv: $idProv,
      idDist: $idDist,
      lote: $lote,
      numMunicipal: $numMunicipal
      sector: $sector
      idManzana: $idManzana
      nombreZona: $nombreZona
      manzanaMunicipal: $manzanaMunicipal
      loteMunicipal: $loteMunicipal
      direccionPredio: $direccionPredio
      direccion: $direccion
      habilitacionUrbana: $habilitacionUrbana
      tipoUsuario: $tipoUsuario
      tipoConstruccion: $tipoConstruccion
      predioHabitado: $predioHabitado
      coordenadas: $coordenadas
    ){
      codigo_respuesta
      mensaje
    }
  }
}
`;