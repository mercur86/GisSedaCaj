import React, { useState } from "react";
import AgGrid from "../../../global/components/AgGridWithSimpleMenuBar";
import { Link } from "react-router-dom";
import { useApolloClient } from "react-apollo-hooks";
import {
    LISTAR_INSPECCIONESVMA_SUMINISTRO,
    columnDefs
} from "./config";

const getInspecciones = (apolloClient, suministro) => {
    return apolloClient.query({
        query: LISTAR_INSPECCIONESVMA_SUMINISTRO,
        variables: { suministro }
    }).then(({ data }) => data.comercial.inspeccionesVMA);
}

const InspeccionesVMA = ({
    suministro,
    nombre_usuario
}) => {
    const [inspecciones, setInspecciones] = useState([]);
    const [gridApi, setGridApi] = useState(null);
    const apolloClient = useApolloClient();

    function mostrarInspecciones(_gridApi) {
        _gridApi.showLoadingOverlay();
        getInspecciones(apolloClient, suministro)
            .then(_inspecciones => {
                if (_inspecciones.length) {
                    _gridApi.hideOverlay();
                } else {
                    _gridApi.showNoRowsOverlay();
                }
                setInspecciones(_inspecciones);
            })
            .catch(error => {
                console.log(error);
            })
    }

    function handleGridReady(params) {
        setGridApi(params.api);
        mostrarInspecciones(params.api);
    }

    return (
        <div className="p-2 h-100 d-flex flex-column">
            <section>
                <Link
                    className="text-dark"
                    to="/info"
                >
                    <i className="fas fa-arrow-left fa-lg cursor-pointer" />
                </Link>
            </section>
            <section className="flex-grow-1 mt-2">
                <AgGrid
                    className="w-100 h-100"
                    barTitle={`INSPECCIONES SUMINISTRO ${suministro} | ${nombre_usuario}`}
                    defaultColDef={{
                        suppressMenu: true,
                        sortable: true
                    }}
                    columnDefs={columnDefs}
                    rowData={inspecciones}
                    localeText={{
                        noRowsToShow: "No hay inspecciones",
                        loadingOoo: "Cargando..."
                    }}
                    onGridReady={handleGridReady}
                    pagination={true}
                    paginationAutoPageSize={true}
                    onGridSizeChanged={() => gridApi.sizeColumnsToFit()}
                />
            </section>
        </div>
    );
}

export default InspeccionesVMA;