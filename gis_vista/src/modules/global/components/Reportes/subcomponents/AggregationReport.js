import React, { useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { withStore } from "../../../../../pages/Mapa/store/Store";
import { formatAggregationResult, reportInfo } from "./config";
import AgGridWithSimpleMenuBar from "../../AgGridWithSimpleMenuBar";

const REGRESAR_ACCION = '1',
    REFRESCAR_ACCION = 2;

const actionsDef = [{
    id: REFRESCAR_ACCION,
    title: "Refrescar",
    icon: "fas fa-sync-alt",
    fixed: true
}, {
    id: REGRESAR_ACCION,
    title: "Regresar",
    icon: "fas fa-arrow-left",
    fixed: true
}];

const GroupByReport = ({ storeContext: { map } }) => {

    const [rowData, setRowData] = useState([]);
    const [gridApi, setGridApi] = useState(null);
    const history = useHistory(); /* en "history.location.state" viene {id,titulo} del reporte*/
    const { reportId } = useParams();
    const { gridParams } = reportInfo[reportId];

    const getData = useCallback((gridApi_) => {
        const conds = [];
        let aggregateParams = {};

        const { idCapa, aggParams } = reportInfo[reportId];
        const capa = map.getCapaById(idCapa);
        gridApi_.showLoadingOverlay();

        if (capa.getFilter()) conds.push(capa.getFilter());
        if (aggParams.cql_filter) conds.push(aggParams.cql_filter);

        aggregateParams = { ...aggParams, cql_filter: conds.join(" AND ") };

        capa.aggregate(aggregateParams)
            .then(data => formatAggregationResult(data))
            .then(data => setRowData(data))
            .finally(() => gridApi_.hideOverlay())
    }, [map, reportId]);

    function handleGridReady(params) {
        setGridApi(params.api);
        getData(params.api);
    }

    function handleBarMenuAction(actionId) {
        if (actionId === REGRESAR_ACCION) {
            history.push("/reports");
        } else if (actionId === REFRESCAR_ACCION) {
            getData(gridApi);
        }
    }

    return (
        <div className="p-3 h-100 d-flex flex-column">
            <section>
                <strong>{history.location.state.titulo.toUpperCase()}</strong>
            </section>
            <section className="flex-grow-1 mt-2">
                <AgGridWithSimpleMenuBar
                    className="w-100 h-100"
                    barTitle="RESULTADO"
                    actionsDef={actionsDef}
                    onBarMenuAction={handleBarMenuAction}
                    defaultColDef={{
                        suppressMenu: true,
                        sortable: true
                    }}
                    rowData={rowData}
                    onGridReady={handleGridReady}
                    onGridSizeChanged={() => gridApi.sizeColumnsToFit()}
                    localeText={{
                        noRowsToShow: 'No hay resultados',
                        loadingOoo: 'Cargando...'
                    }}
                    pagination={true}
                    paginationAutoPageSize={true}
                    {...gridParams}
                />
            </section>
        </div>
    );
}

export default withStore(GroupByReport);