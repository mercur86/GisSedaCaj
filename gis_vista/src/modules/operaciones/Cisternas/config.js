export const defaultColDef = {
    suppressMenu: true,
    sortable: true,
    resizable: true
};

export const columnDefs = [
    {
        headerName: "Placa",
        field: "placa",
        width: 120,
        minWidth: 120
    },
    {
        headerName: "Chofer",
        field: "chofer",
        width: 180,
        minWidth: 180
    },
    {
        headerName: "Dirección",
        field: "direccion",
        width: 320,
        minWidth: 320
    },
    {
        headerName: "Horario",
        field: "horario",
        width: 220,
        minWidth: 220
    },
    {
        headerName: "Beneficiarios",
        field: "zonasAbastecidas",
        width: 340,
        minWidth: 340
    }
];

export const DELETE = 'DEL',
    EDIT = 'EDIT',
    DOWNLOAD = 'DOWNLOAD',
    REFRESH = 'REFRESH';

export const actionsDef = [
    {
        id: REFRESH,
        title: "Refrescar",
        icon: "fas fa-sync",
        fixed: true
    },
    {
        id: DOWNLOAD,
        title: "Descargar",
        icon: "fas fa-download",
        fixed: true
    }, {
        id: EDIT,
        title: "Editar",
        icon: "fas fa-edit"
    }, {
        id: DELETE,
        title: "Eliminar",
        icon: "fas fa-trash"
    }]

export const initialData = {
    id: "",
    placa: "",
    chofer: "",
    direccion: "",
    horaInicial12: "",
    horaFinal12: "",
    zonasAbastecidas: "",
    longitud: "",
    latitud: ""
};

export const confirmDeleteOptions = {
    title: '¿Está seguro?',
    text: "La operación es irreversible.",
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, proceder'
};

export const confirmSavingOptions = {
    title: '¿Desea continuar?',
    text: "Considere verificar que los datos ingresados así como la ubicación sean correctos.",
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Continuar'
}
