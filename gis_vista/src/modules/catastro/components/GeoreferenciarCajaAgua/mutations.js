import gql from 'graphql-tag';

export const ACTUALIZAR_CAJA_AGUA_USUARIO = gql`
mutation actualizarCajaAguaUsuario(
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
    actualizarCajaAguaUsuario(
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

export const GEOREFERENCIAR_CAJA_AGUA_USUARIO = gql`
mutation georeferenciarCajaAguaUsuario(
  $numInscripcion: Int!,
  $nroFicha: Int,
  $distanciaCajaExteriorPredio: Int,
  $distanciaExteriorIzquierdaDerecha: Int,
  $distanciaCajaInteriorDentroFuera: Int,
  $coordenadas: [Float!]!
)
{
  catastro{
    georeferenciarCajaAguaUsuario(
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

export const MOVER_CAJA_AGUA = gql`
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
      distanciaCajaExteriorPredio: $distanciaCajaExteriorPredio,
      distanciaExteriorIzquierdaDerecha: $distanciaExteriorIzquierdaDerecha,
      distanciaCajaInteriorDentroFuera: $distanciaCajaInteriorDentroFuera,
      coordenadas: $coordenadas
    )
  }
}
`;