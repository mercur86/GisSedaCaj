import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import AgGridWithSimpleMenuBar from "../../../global/components/AgGridWithSimpleMenuBar";

const columnDefs = [
    {
        headerName: "Hab. Urbana",
        field: "habilitacion_urbana",
        minWidth: 120
    },
    {
        headerName: "Consumo (m3)",
        field: "consumo",
        minWidth: 80
    },
    {
        headerName: "Consumo (S/)",
        field: "consumo_soles",
        minWidth: 80
    },
    {
        headerName: "% Consumo",
        field: "consumo_porcien",
        minWidth: 80
    },
    {
        headerName: "% Consumo (S/)",
        field: "consumo_soles_porcien",
        minWidth: 80
    }
]

export default ({
    data,
    titulo
}) => {

    const [gridApi, setGridApi] = useState(null);
    const { path } = useRouteMatch();
    const path2graph = `/${path.split("/")[1]}`;

    function handleGridReady(params) {
        setGridApi(params.api);
    }

    return (
        <div>
            <Link
                className="btn btn-link btn-sm pl-0"
                to="/form"
            >
                Editar parámetros
            </Link>
            <Link
                className="btn btn-link btn-sm"
                to={path2graph}
            >
                Ver gráfico
            </Link>
            <p className="text-center mb-1">{titulo}</p>
            <div
                style={{ height: '380px' }}
                className="mt-1">
                <AgGridWithSimpleMenuBar
                    className="w-100 h-100"
                    barTitle="Distribución consumo"
                    defaultColDef={{
                        resizable: true,
                        suppressMenu: true,
                        sortable: true
                    }}
                    columnDefs={columnDefs}
                    rowData={data}
                    onGridReady={handleGridReady}
                    onGridSizeChanged={() => gridApi.sizeColumnsToFit()}
                    pagination={true}
                    paginationAutoPageSize={true}
                />
            </div>
        </div>
    );
}