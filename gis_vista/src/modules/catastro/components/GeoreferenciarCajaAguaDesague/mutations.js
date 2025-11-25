import gql from 'graphql-tag';

export const NUEVA_CAJA_DESAGUE_USUARIO = gql`
mutation georeferenciarCajaDesague(
  $numInscripcion: Int!,
  $nroFicha: Int,
  $distanciaCajaExteriorPredio: Int,
  $distanciaExteriorIzquierdaDerecha: Int,
  $distanciaCajaInteriorDentroFuera: Int,
  $coordenadas: [Float!]!
)
{
  catastro{
    georeferenciarCajaDesague(
      numInscripcion:$numInscripcion,
      nroFicha: $nroFicha,
      distanciaCajaExteriorPredio: $distanciaCajaExteriorPredio,
      distanciaExteriorIzquierdaDerecha: $distanciaExteriorIzquierdaDerecha,
      distanciaCajaInteriorDentroFuera: $distanciaCajaInteriorDentroFuera,
      coordenadas: $coordenadas
    ){
      codigo_respuesta
      mensaje
    }
  }
}
`;




export const ACTUALIZAR_CAJA_DESAGUE_USUARIO = gql`
mutation actualizarCajaDesagueUsuario(
  $gid: Int!,
  $numInscripcion: Int!,
  $nroFicha: Int,
  $distanciaCajaExteriorPredio: Int,
  $distanciaExteriorIzquierdaDerecha: Int,
  $distanciaCajaInteriorDentroFuera: Int,
  $coordenadas: [Float!]!
)
{
  catastro{
    actualizarCajaDesagueUsuario(
      gid:$gid,
      numInscripcion:$numInscripcion,
      nroFicha: $nroFicha,
      distanciaCajaExteriorPredio: $distanciaCajaExteriorPredio,
      distanciaExteriorIzquierdaDerecha: $distanciaExteriorIzquierdaDerecha,
      distanciaCajaInteriorDentroFuera: $distanciaCajaInteriorDentroFuera,
      coordenadas: $coordenadas
    ){
      codigo_respuesta
      mensaje
    }
  }
}
`;


export const MOVER_CAJA_DESAGUE = gql`
mutation moverCajaAgua(
  $numInscripcion: Int!,
  $nroFicha: Int,
  $distanciaCajaExteriorPredio: Int,
  $distanciaExteriorIzquierdaDerecha: Int,
  $distanciaCajaInteriorDentroFuera: Int,
  $coordenadas: [Float!]!
)
{
  catastro{
    moverCajaAgua(
      numInscripcion: $numInscripcion,
      nroFicha: $nroFicha,
      distanciaExteriorIzquierdaDerecha: $distanciaExteriorIzquierdaDerecha,
      distanciaCajaInteriorDentroFuera: $distanciaCajaInteriorDentroFuera,
      distanciaCajaInteriorDentroFuera: $distanciaCajaInteriorDentroFuera,
      coordenadas: $coordenadas
    )
  }
}
`;