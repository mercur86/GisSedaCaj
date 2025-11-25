import gql from "graphql-tag";

export const LECTURAS_PUNTO_MUESTREO = gql`
query LecturasPuntoMuestreo($suministro: Int!) {
    operaciones {
      lecturasPuntoMuestreo(suministro: $suministro) {
        anio
        mes
        presion
        continuidad
      }
    }
  }
`;

export const columnDefs = [
    {
        headerName: "Año",
        field: "anio",
        width: 80,
        minWidth: 80
    },
    {
        headerName: "Mes",
        field: "mes",
        width: 120,
        minWidth: 120,
    },
    {
        headerName: "Presión (m.c.a)",
        field: "presion",
        width: 80,
        minWidth: 80,
    },
    {
        headerName: "Continuidad (h)",
        field: "continuidad",
        width: 80,
        minWidth: 80,
    }
];