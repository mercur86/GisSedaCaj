import gql from "graphql-tag";

export const CUENTA_CORRIENTE_SUMINISTRO = gql`
query cuentaCorriente($suministro: String!) {
    comercial {
      cuentaCorriente(suministro: $suministro) {
        abono
        cargo
        saldo
        concepto_cuenta
        estado_anexo
        fecha
        flagJudicial
        flagResponsabilidadPago
        flagSaneado
        id_anexo
        id: id_corr
      }
    }
  }
`;

export const columnDefs = [
    {
        headerName: "Fecha",
        field: "fecha",
        width: 150,
        minWidth: 150
    },
    {
        headerName: "Serie - Nro",
        field: "id_anexo",
        width: 150,
        minWidth: 150,
    },
    {
        headerName: "Operación",
        field: "concepto_cuenta",
        width: 220,
        minWidth: 220,
    },
    {
        headerName: "Estado",
        field: "estado_anexo",
        width: 100,
        minWidth: 100,
    },
    {
        headerName: "Cargo",
        field: "cargo",
        width: 70,
        minWidth: 70,
    },
    {
        headerName: "Abono",
        field: "abono",
        width: 70,
        minWidth: 70,
    },
    {
        headerName: "Saldo",
        field: "saldo",
        width: 70,
        minWidth: 70,
    },
    {
        headerName: "Saneado",
        width: 70,
        minWidth: 70,
        resizable: true,
        valueFormatter: (params) => {
            if (params.data.flagSaneado) return 'SI';
            return '-';
        }
    },
    {
        headerName: "Judicial",
        width: 70,
        minWidth: 70,
        resizable: true,
        valueFormatter: (params) => {
            if (params.data.flagJudicial) return 'SI';
            return '-';
        }
    },
    {
        headerName: "Resp. Pago",
        width: 70,
        minWidth: 70,
        resizable: true,
        valueFormatter: (params) => {
            if (params.data.flagResponsabilidadPago) return 'SI';
            return '-';
        }
    },
];