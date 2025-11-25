import gql from "graphql-tag";

export const LISTAR_HISTORICO_FUGA_TUBERIA = gql`
query listaFugaTuberia($gidTuberia: Int!, $tipoElemento: String!){
  operaciones{
    listaFugasTuberia(gidTuberia:$gidTuberia, tipoElemento:$tipoElemento){
      tipo_incidencia
      descripcion
      referencia_ubicacion
      fecha_hora_incidencia
      fecha_hora_solucion
      tiempo_transcurrido
      volumen_perdido_agua
    }
  }
}
`;

export const columnDefs = [
    {
        headerName: "Tipo de incidencia",
        field: "tipo_incidencia",
        width: 150,
        minWidth: 150
    },
    {
        headerName: "Descripción",
        field: "descripcion",
        width: 180,
        minWidth: 180,
    },
    {
        headerName: "Referencia de ubicación",
        field: "referencia_ubicacion",
        width: 150,
        minWidth: 150,
    },
    {
        headerName: "Fecha incicio",
        field: "fecha_hora_incidencia",
        width: 120,
        minWidth: 120,
    },
    {
        headerName: "Fecha control",
        field: "fecha_hora_solucion",
        width: 120,
        minWidth: 120,
    },
    {
        headerName: "Tiempo transcurrido",
        field: "tiempo_transcurrido",
        width: 120,
        minWidth: 120,
    },
    {
        headerName: "Volumen perdido",
        field: "volumen_perdido_agua",
        width: 120,
        minWidth: 120,
    }
];