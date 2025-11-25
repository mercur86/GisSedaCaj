import gql from 'graphql-tag';

export const REGISTRAR_PERDIDA_OPERACIONAL = gql`
mutation registrarPerdidaOperacionalLimpiezaMantenimientoReservorio(
  $id_provincia: Int!,
  $id_distrito: Int!,
  $id_reservorio: Int!,
  $capacidad: Float!,
  $radio_cuba:Float!,
  $perdida_estimada:Float!,
  $fecha_limpieza: String!,
  $dni_usuario: String!
  ){
    operaciones{
      registrarPerdidaOperacionalLimpiezaMantenimientoReservorio(
            id_provincia: $id_provincia,
            id_distrito:$id_distrito,
            id_reservorio:$id_reservorio,
            capacidad:$capacidad,
            radio_cuba:$radio_cuba,
            perdida_estimada:$perdida_estimada,
            fecha_limpieza: $fecha_limpieza,
            dni_usuario: $dni_usuario   
      )
    }
  }
`;

//deberia ir en queries :v
export const OBTENER_RESERVORIOS_BY_PROVDIST = gql`
query obtenerReservoriosByProvDist($idProvincia: Int!, $idDistrito: Int!
  ){
    operaciones{
      obtenerReservoriosByProvDist(idProvincia:$idProvincia, idDistrito: $idDistrito){
        id,
        nombre
      }
    }
  }
`;