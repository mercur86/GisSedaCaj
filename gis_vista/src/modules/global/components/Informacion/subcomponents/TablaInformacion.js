import React, { useState } from "react";
import { Query } from "react-apollo";
import { DICCIONARIO_CAPA } from "../queries";
import Alert from "../../../../../lib/alerts";
import AgGridWithSimpleMenuBar from "../../AgGridWithSimpleMenuBar";

const columnDefs = [
    {
        headerName: "Propiedad",
        width: 220,
        minWidth: 220,
        maxWidth: 220,
        valueGetter: ({ data }) => data.propiedad
    },
    {
        headerName: "Valor",
        field: "valor",
        width: 180,
        minWidth: 180
    }
];

const defaultColDef = {
    suppressMenu: true,
    sortable: true
};

const formatearPropiedades = (propiedades, diccionario) => {
    let propiedadesFormateadas = []; // formato: {propiedad, valor, icono descripcion}
    for (let key in propiedades) {
        if (!propiedades.hasOwnProperty(key)) continue;
        // buscar en el diccionario
        let objetoDiccionario = diccionario.find(item => item.propiedad === key);
        if (objetoDiccionario) {
            const valor = propiedades[key];
            const { nombre, descripcion, icono } = objetoDiccionario;
            propiedadesFormateadas.push({ propiedad: nombre, valor, icono, descripcion });
        }
    }
    return propiedadesFormateadas;
};

const Tabla = ({ diccionario, feature }) => {
    const [gridApi, setGridApi] = useState(null);
    const propiedades = formatearPropiedades(feature.getProperties(), diccionario);

    function handleGridReady(params) {
        setGridApi(params.api);
    }

    return (
        <AgGridWithSimpleMenuBar
            className="w-100 h-100"
            barTitle="Información"
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowData={propiedades}
            onGridReady={handleGridReady}
            onGridSizeChanged={() => gridApi.sizeColumnsToFit()}
        />
    );

};

export default ({ feature, idCapa }) => {

    return (
        <Query
            query={DICCIONARIO_CAPA}
            variables={{ idCapa }}
        >
            {({ data, error, loading }) => {
                if (loading) return <p>Preparando información...</p>;
                if (error) return <Alert tipo="danger">{error.message}</Alert>;

                return <Tabla
                    diccionario={data.sistema.diccionarioCapa}
                    feature={feature}
                />
            }}
        </Query>
    );
}