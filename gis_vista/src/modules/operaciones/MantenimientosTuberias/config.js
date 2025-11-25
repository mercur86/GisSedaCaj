import gql from "graphql-tag";

export const LISTAR_MANTENIMIENTO_TUBERIA = gql`
query listaMantanimientoTuberia ($gidTuberia:Int!,$tuberiaPertenece:String!){
  operaciones{
    listaMantenimientosTuberia(gidTuberia:$gidTuberia,tuberiaPertenece:$tuberiaPertenece){
      codigo
      costo_proyectado
      costo_real
      direccion
      empresa
      estado
      fecha_fin
      fecha_inicio
      tipo_comprobante
      numero
      serie
      acciones{
        codigo
        descripcion
      }
    }
  }
}
`;

export const columnDefs = [
    {
        headerName: "Código orden",
        field: "codigo",
        width: 120,
        minWidth: 120
    },
    {
        headerName: "Acciones",
        // field: "acciones",
        width: 200,
        minWidth: 200,
        valueGetter: (params) => {
            const listaAcciones = params.data.acciones
            const acciones = listaAcciones.map(data => data.descripcion).join(", ");
            return acciones;
        }
    },
    {
        headerName: "Costo real",
        field: "costo_real",
        width: 100,
        minWidth: 100,
    },
    {
        headerName: "Costo proyectado",
        field: "costo_proyectado",
        width: 120,
        minWidth: 120,
    },
    {
        headerName: "Dirección",
        field: "direccion",
        width: 150,
        minWidth: 150,
    },
    {
        headerName: "Comprobante",
        field: "tipo_comprobante",
        width: 120,
        minWidth: 120,
    },
    {
        headerName: "Número comprobante",
        // field: "numero",
        width: 120,
        minWidth: 120,
        valueGetter: (params) => {
            return `${params.data.serie}-${params.data.numero}`;
        }
    },
    {
        headerName: "Estado",
        field: "estado",
        width: 120,
        minWidth: 120,
    },
    {
        headerName: "Fecha inicio",
        field: "fecha_inicio",
        width: 120,
        minWidth: 120,
    },
    {
        headerName: "Fecha fin",
        field: "fecha_fin",
        width: 120,
        minWidth: 120,
    },
    {
        headerName: "Empresa ejecutora",
        field: "empresa",
        width: 130,
        minWidth: 130,
    }
];