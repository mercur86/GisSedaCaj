import React, { useState } from "react";
import AgGrid from "../../global/components/AgGridWithSimpleMenuBar";
import { Link } from "react-router-dom";
import { useApolloClient } from "react-apollo-hooks";
import {
    LISTAR_HISTORICO_FUGA_TUBERIA,
    columnDefs
} from "./config";

const getFugas = (apolloClient, gidTuberia) => {
    return apolloClient.query({
        query: LISTAR_HISTORICO_FUGA_TUBERIA,
        variables: { gidTuberia, tipoElemento: "RED AGUA" }
    }).then(({ data }) => data.operaciones.listaFugasTuberia);
}

const FugasTuberias = ({
    gid
}) => {

    const [fugas, setFugas] = useState([]);
    const [gridApi, setGridApi] = useState(null);
    const apolloClient = useApolloClient();

    function listarFugas(_gridApi) {
        _gridApi.showLoadingOverlay();
        getFugas(apolloClient, gid)
            .then(_fugas => {
                if (_fugas.length) {
                    _gridApi.hideOverlay();
                } else {
                    _gridApi.showNoRowsOverlay();
                }
                setFugas(_fugas);
            })
            .catch(error => {
                console.log(error);
            })
    }

    function handleGridReady(params) {
        setGridApi(params.api);
        listarFugas(params.api);
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
                    barTitle={`MANTENIMIENTOS TUBERÍA CÓDIGO ${gid}`}
                    defaultColDef={{
                        suppressMenu: true,
                        sortable: true
                    }}
                    columnDefs={columnDefs}
                    rowData={fugas}
                    localeText={{
                        noRowsToShow: "No hay registro de fugas",
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

export default FugasTuberias;