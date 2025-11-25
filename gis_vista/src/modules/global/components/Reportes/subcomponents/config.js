import {
    CAPA_TUBERIAS,
    CAPA_TUBERIAS_ALCANTARILLADO,
    CAPA_USUARIOS
} from "../../../../values";

const columnConfig2 = {
    width: 80,
    minWidth: 80
};

const columnConfig1 = {
    width: 130,
    minWidth: 130
}

export const reportInfo = {
    "rop1": {
        idCapa: CAPA_TUBERIAS,
        aggParams: {
            cql_filter: 'length is not null',
            aggregationAttribute: 'length',
            functions: ['Sum'],
            groupByAttributes: ['material']
        },
        gridParams: {
            columnDefs: [{
                headerName: "Material",
                field: "material",
                ...columnConfig1
            }, {
                headerName: "Longitud (m)",
                field: "sum",
                ...columnConfig2
            }]
        }
    },
    "rop2": {
        idCapa: CAPA_TUBERIAS,
        aggParams: {
            cql_filter: 'length is not null',
            aggregationAttribute: 'length',
            functions: ['Sum'],
            groupByAttributes: ['tipo_funcion']
        },
        gridParams: {
            columnDefs: [{
                headerName: "Función",
                field: "tipo_funcion",
                ...columnConfig1
            }, {
                headerName: "Longitud (m)",
                field: "sum",
                ...columnConfig2
            }]
        }
    },
    "rop3": {
        idCapa: CAPA_TUBERIAS,
        aggParams: {
            cql_filter: 'length is not null',
            aggregationAttribute: 'length',
            functions: ['Sum'],
            groupByAttributes: ['material', 'dn_plg']
        },
        gridParams: {
            columnDefs: [{
                headerName: "Material",
                field: "material",
                ...columnConfig1
            }, {
                headerName: "Diámetro (plg)",
                field: "dn_plg",
                ...columnConfig2
            }, {
                headerName: "Longitud (m)",
                field: "sum",
                ...columnConfig2
            }]
        }
    },
    "rop4": {
        idCapa: CAPA_TUBERIAS_ALCANTARILLADO,
        aggParams: {
            cql_filter: 'length is not null',
            aggregationAttribute: 'length',
            functions: ['Sum'],
            groupByAttributes: ['estado_conservacion']
        },
        gridParams: {
            columnDefs: [{
                headerName: "Conservación",
                field: "estado_conservacion",
                ...columnConfig1
            }, {
                headerName: "Longitud (m)",
                field: "sum",
                ...columnConfig2
            }]
        }
    },
    "rop5": {
        idCapa: CAPA_TUBERIAS_ALCANTARILLADO,
        aggParams: {
            cql_filter: 'length is not null',
            aggregationAttribute: 'length',
            functions: ['Sum'],
            groupByAttributes: ['material', 'dn_plg']
        },
        gridParams: {
            columnDefs: [{
                headerName: "Material",
                field: "material",
                ...columnConfig1
            }, {
                headerName: "Diámetro (plg)",
                field: "dn_plg",
                ...columnConfig2
            }, {
                headerName: "Longitud (m)",
                field: "sum",
                ...columnConfig2
            }]
        }
    },
    "rco1": {
        idCapa: CAPA_USUARIOS,
        aggParams: {
            cql_filter: 'suministro is not null',
            aggregationAttribute: 'suministro',
            functions: ['Count'],
            groupByAttributes: ['categoria']
        },
        gridParams: {
            columnDefs: [{
                headerName: "Categoría",
                field: "categoria",
                ...columnConfig1
            }, {
                headerName: "Total",
                field: "count",
                ...columnConfig2
            }]
        }
    },
    "rco2": {
        idCapa: CAPA_USUARIOS,
        aggParams: {
            cql_filter: 'suministro is not null',
            aggregationAttribute: 'suministro',
            functions: ['Count'],
            groupByAttributes: ['estado_predio', 'categoria']
        },
        gridParams: {
            columnDefs: [{
                headerName: "Estado predio",
                field: "estado_predio",
                ...columnConfig1
            }, {
                headerName: "Categoría",
                field: "categoria",
                ...columnConfig1
            }, {
                headerName: "Total",
                field: "count",
                ...columnConfig2
            }]
        }
    },
    "rco3": {
        idCapa: CAPA_USUARIOS,
        aggParams: {
            cql_filter: 'suministro is not null',
            aggregationAttribute: 'suministro',
            functions: ['Count'],
            groupByAttributes: ['estado_predio', 'situacion_conexion']
        },
        gridParams: {
            columnDefs: [{
                headerName: "Estado predio",
                field: "estado_predio",
                ...columnConfig1
            }, {
                headerName: "Situación conexión",
                field: "situacion_conexion",
                ...columnConfig1
            }, {
                headerName: "Total",
                field: "count",
                ...columnConfig2
            }]
        }
    }
}

export const reportsList = [
    {
        id: "rop1",
        titulo: "Metrado de tuberías de agua por material"
    },
    {
        id: "rop2",
        titulo: "Metrado de tuberías de agua por función"
    },
    {
        id: "rop3",
        titulo: "Metrado de tuberías de agua por material y diámetro"
    },
    {
        id: "rop4",
        titulo: "Metrado de tuberías de alcantarillado por estado de conservación"
    },
    {
        id: "rop5",
        titulo: "Metrado de tuberías de alcantarillado por material y diámetro"
    },
    {
        id: "rco1",
        titulo: "Cantidad de usuarios por categoría"
    },
    {
        id: "rco2",
        titulo: "Cantidad de usuarios por estado y categoría"
    },
    {
        id: "rco3",
        titulo: "Cantidad de usuarios por estado y situación"
    }
];

export const formatAggregationResult = (result) => {
    const headers = result.GroupByAttributes.concat(result.AggregationFunctions).map(e => e.toLowerCase());
    return result.AggregationResults.map(data => {
        return data.reduce((acc, currVal, idx) => ({ ...acc, [headers[idx]]: currVal }), {});
    });
}