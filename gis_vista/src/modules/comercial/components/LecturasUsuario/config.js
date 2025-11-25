import gql from "graphql-tag";

export const columnDefs = [
    {
        headerName: "Medidor",
        field: "id_medidor",
        width: 150,
        minWidth: 150
    },
    {
        headerName: "Periodo",
        field: "periodo",
        width: 130,
        minWidth: 130,
    },
    {
        headerName: "Lectura diámetro mayor",
        field: "lectura_diametro_mayor",
        width: 140,
        minWidth: 140,
    },
    {
        headerName: "Lectura diámetro menor",
        field: "lectura_diametro_menor",
        width: 140,
        minWidth: 140,
    },
    {
        headerName: "Tipo lectura",
        field: "tipo_lectura",
        width: 100,
        minWidth: 100,
    },
    {
        headerName: "Criticada",
        field: "lectura_criticada",
        width: 120,
        minWidth: 120,
    },
    {
        headerName: "Fecha lectura",
        field: "fecha_lectura",
        width: 120,
        minWidth: 120,
    }
];

export const LISTAR_LECTURAS_SUMINISTRO = gql`
query LecturasUsuario($suministro: Int!){
    comercial{
      lecturasUsuario(suministro:$suministro){
        id_medidor
        periodo
        lectura_diametro_mayor
        lectura_diametro_menor
        tipo_lectura
        lectura_criticada
        fecha_lectura
      }
    }
  }
`;