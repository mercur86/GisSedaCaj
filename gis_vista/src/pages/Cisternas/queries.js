import gql from 'graphql-tag';

export const LISTA_CISTERNAS = gql`
query cisternas($visibilityFilter: String!) {
  listaCisternas(visibilityFilter:$visibilityFilter) {
    id
    placa
    chofer
    horaInicial24: hora_inicial
    horaFinal24: hora_final
    horario
    direccion
    zonasAbastecidas: zonas_abastecidas
    longitud
    latitud
  }
}
`;

export const INFO_CLIENTE = gql`
query infoClient($suministro: String!) {
  infoCliente(suministro: $suministro) {
    id
    direccion_predio
    nombre_usuario
    longitud
    latitud
  }
}
`;