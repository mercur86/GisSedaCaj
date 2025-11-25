import React, { useState } from "react";
import Alert, { TIPO_ALERTA } from "../../../../../lib/alerts";
import {
    LABEL_NOTA_REPORTES,
    generarColumnasPaReportes
} from "../values";
import AgGridWithSimpleMenuBar from "../../AgGridWithSimpleMenuBar";
import { useHistory } from "react-router-dom";
import { reportsList } from "./config";

export default () => {
    const history = useHistory();
    const [gridApi, setGridApi] = useState(null);
    const [columnDefs] = useState(generarColumnasPaReportes(history));

    function handleGridReady(params) {
        setGridApi(params.api);
    }

    return (
        <div className="h-100 d-flex flex-column p-3">
            <Alert tipo={TIPO_ALERTA.INFORMACION}>{LABEL_NOTA_REPORTES}</Alert>
            <AgGridWithSimpleMenuBar
                className="flex-grow-1 w-100"
                barTitle="Reportes"
                defaultColDef={{
                    suppressMenu: true
                }}
                columnDefs={columnDefs}
                rowData={reportsList}
                onGridReady={handleGridReady}
                onGridSizeChanged={() => gridApi.sizeColumnsToFit()}
                localeText={{
                    noRowsToShow: 'No hay reportes',
                    loadingOoo: 'Cargando...'
                }}
            />
        </div>
    );
}