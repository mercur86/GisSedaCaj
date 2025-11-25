export const initialData = {
    referenciaIdentificacion: ""
};

export const defaultColDef = {
    suppressMenu: true,
    sortable: true,
    resizable: true
};

export const columnDefs = [
    {
        headerName: "ID",
        field: "id",
        width: 80,
        minWidth: 80
    },
    {
        headerName: "Número",
        field: "numero",
        width: 120,
        minWidth: 120
    },
    {
        headerName: "Ref. Identificación",
        field: "referenciaIdentificacion",
        width: 200,
        minWidth: 200
    }
];

export const DELETE = 'DEL',
    EDIT = 'EDIT',
    REFRESH = 'REFRESH';

export const actionsDef = [
    {
        id: REFRESH,
        title: "Refrescar",
        icon: "fas fa-sync",
        fixed: true
    },
    {
        id: EDIT,
        title: "Editar",
        icon: "fas fa-edit"
    },
    {
        id: DELETE,
        title: "Eliminar",
        icon: "fas fa-trash"
    }
];

export const confirmSavingOptions = {
    title: '¿Desea continuar?',
    text: "Considere verificar que los datos ingresados así como la ubicación sean correctos.",
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Continuar'
}

export const confirmDeleteOptions = {
    title: '¿Está seguro?',
    text: "La operación es irreversible.",
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, proceder'
}