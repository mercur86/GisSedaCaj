import gql from 'graphql-tag';

export const LISTAR_INSPECCIONESVMA_SUMINISTRO = gql`
query InspeccionesVMA($suministro: Int!){
  comercial{
    inspeccionesVMA(suministro:$suministro){
      fecha_inspeccion
      hora_inspeccion
      num_inscripcion
      dbo
      dqo
      sst
      ayg
      estado_inspeccion
      factor_ajuste_inspeccion
    }
  }
}
`;

export const columnDefs = [
    {
        headerName: "Fecha",
        width: 150,
        minWidth: 150,
        valueGetter: (params) => {
            return `${params.data.fecha_inspeccion} ${params.data.hora_inspeccion}`;
        }
    },
    {
        headerName: "dbo",
        field: "dbo",
        width: 130,
        minWidth: 130,
    },
    {
        headerName: "dqo",
        field: "dqo",
        width: 140,
        minWidth: 140,
    },
    {
        headerName: "sst",
        field: "sst",
        width: 140,
        minWidth: 140,
    },
    {
        headerName: "ayg",
        field: "ayg",
        width: 120,
        minWidth: 120,
    },
    {
        headerName: "Estado",
        field: "estado_inspeccion",
        width: 120,
        minWidth: 120,
    },
    {
        headerName: "Factor de ajuste",
        field: "factor_ajuste_inspeccion",
        width: 120,
        minWidth: 120,
    }
];