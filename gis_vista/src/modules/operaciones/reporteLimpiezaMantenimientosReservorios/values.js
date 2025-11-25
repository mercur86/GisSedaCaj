export const LABEL_LISTADO_LIMPMANT= 'Listado de limpiezas y desinfecciones';

function dateComparator(field, _, __, nodeA, nodeB) {
    const tsA = parseInt(nodeA.data[field]),
        tsB = parseInt(nodeB.data[field]);
    return tsA - tsB;
}

export const columnDefs = [
    
    {
        headerName: "Provincia",
        field: "provincia_s",
        width: 130,
        minWidth: 130
    },
    {
        headerName: "Distrito",
        field: "distrito_s",
        width: 130,
        minWidth: 130
    },
    {
        headerName: "Reservorio",
        field: "reservorio_s",
        width: 160,
        minWidth: 160,
    },
    {
        headerName: "Capacidad m3",
        field: "capacidad_reservorio_s",
        width: 160,
        minWidth: 160,
    },
    {
        headerName: "Perdida estimada m3",
        field: "perdida_estimada_s",
        width: 160,
        minWidth: 160,
    },
    {
        headerName: "Fecha limpieza",
        field: "fecha_limpieza_s",
        width: 160,
        minWidth: 160
    }
];

export const DOWNLOAD_ACTION = 'DOWNLOAD',
    DELETE_ACTION = 'DELETE';

export const actionsDef = [
    {
        id: DOWNLOAD_ACTION,
        title: "Descargar",
        icon: "fas fa-download",
        fixed: true
    }
]

