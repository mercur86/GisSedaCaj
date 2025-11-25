import React, { useState } from "react";
import AgGrid from "../../../global/components/AgGridWithSimpleMenuBar";
import {
    CUENTA_CORRIENTE_SUMINISTRO,
    columnDefs
} from "./config";
import { Link } from "react-router-dom";
import { useApolloClient } from "react-apollo-hooks";

const getMovimientos = (apolloClient, suministro) => {
    return apolloClient.query({
        query: CUENTA_CORRIENTE_SUMINISTRO,
        variables: { suministro }
    }).then(({ data }) => data.comercial.cuentaCorriente);
}

const FacturacionUsuario = ({
    suministro,
    nombre_usuario
}) => {

    const [movimientos, setMovimientos] = useState([]);
    const [gridApi, setGridApi] = useState(null);
    const apolloClient = useApolloClient();

    function mostrarMovimientos(_gridApi) {
        _gridApi.showLoadingOverlay();
        getMovimientos(apolloClient, `${suministro}`)
            .then(_movimientos => {
                if (_movimientos.length) {
                    _gridApi.hideOverlay();
                } else {
                    _gridApi.showNoRowsOverlay();
                }
                _movimientos.sort((a, b) => b.id - a.id);
                setMovimientos(_movimientos);
            })
            .catch(error => {
                console.log(error);
            })
    }

    function handleGridReady(params) {
        setGridApi(params.api);
        mostrarMovimientos(params.api);
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
                    barTitle={`TRANSACCIONES CUENTA CORRIENTE | SUMINISTRO ${suministro} | ${nombre_usuario}`}
                    defaultColDef={{
                        suppressMenu: true,
                        sortable: true
                    }}
                    columnDefs={columnDefs}
                    rowData={movimientos}
                    localeText={{
                        noRowsToShow: "No hay movimientos",
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

export default FacturacionUsuario;