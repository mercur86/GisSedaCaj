export const LABEL_LISTADO_FUGAS = 'Listado de fugas';

function dateComparator(field, _, __, nodeA, nodeB) {
    const tsA = parseInt(nodeA.data[field]),
        tsB = parseInt(nodeB.data[field]);
    return tsA - tsB;
}

export const columnDefs = [
    {
        headerName: "ID",
        field: "id",
        width: 60,
        minWidth: 60
    },
    {
        headerName: "Lugar de la fuga",
        field: "lugar_fuga",
        width: 150,
        minWidth: 150
    },
    {
        headerName: "Descripción",
        field: "descripcion",
        width: 290,
        minWidth: 290
    },
    {
        headerName: "Referencia ubicación",
        field: "referencia_ubicacion",
        width: 400,
        minWidth: 400
    },
    {
        headerName: "Provincia",
        field: "provincia",
        width: 130,
        minWidth: 130
    },
    {
        headerName: "Distrito",
        field: "distrito",
        width: 130,
        minWidth: 130
    },
    {
        headerName: "Fecha inicio de la fuga",
        field: "fecha_inicio",
        width: 160,
        minWidth: 160,
        comparator: dateComparator.bind(null, 'fecha_inicio_timestamp')
    },
    {
        headerName: "Fecha solución de la fuga",
        field: "fecha_solucion",
        width: 160,
        minWidth: 160,
        comparator: dateComparator.bind(null, 'fecha_solucion_timestamp')
    },
    {
        headerName: "Código del elemento afectado",
        field: "codigo_elemento_afectado",
        width: 100,
        minWidth: 100
    },
    {
        headerName: "Diámetro (mm)",
        field: "diametro_tuberia",
        width: 120,
        minWidth: 120
    },
    {
        headerName: "Volumen perdido",
        field: "volumen_perdido_agua",
        width: 120,
        minWidth: 120
    }, {
        headerName: "Usuario sistema",
        field: "nombre_usuario_registro",
        width: 240,
        minWidth: 240
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
    },
    {
        id: DELETE_ACTION,
        title: "Eliminar registro",
        icon: "fas fa-trash"
    }
]

export const deleteConfirmationOpts = {
    title: '¿Desea continuar con la eliminación?',
    text: "Esta operación es irreversible.",
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Continuar'
}