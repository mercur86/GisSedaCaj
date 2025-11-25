import React, { useState } from "react";
import { CAPA_TUBERIAS } from "../../values";
import AgGrid from "../../global/components/AgGridWithSimpleMenuBar";
import { Link } from "react-router-dom";
import { useApolloClient } from "react-apollo-hooks";
import { LISTAR_MANTENIMIENTO_TUBERIA, columnDefs } from "./config";

const getTuberiaPertenece = (capa) => {
    return capa.get('id') === CAPA_TUBERIAS ? "Red Agua" : "Red Alcantarillado";
}

const getMantenimientos = (apolloClient, gidTuberia, capa) => {
    const tuberiaPertenece = getTuberiaPertenece(capa);
    return apolloClient.query({
        query: LISTAR_MANTENIMIENTO_TUBERIA,
        variables: { gidTuberia, tuberiaPertenece }
    }).then(({ data }) => data.operaciones.listaMantenimientosTuberia);
}

const MantenimientosTuberias = ({
    gid,
    capa
}) => {
    const [mantenimientos, setMantenimientos] = useState([]);
    const [gridApi, setGridApi] = useState(null);
    const apolloClient = useApolloClient();

    function listarMantenimientos(_gridApi) {
        _gridApi.showLoadingOverlay();
        getMantenimientos(apolloClient, gid, capa)
            .then(_mantenimientos => {
                if (_mantenimientos.length) {
                    _gridApi.hideOverlay();
                } else {
                    _gridApi.showNoRowsOverlay();
                }
                setMantenimientos(_mantenimientos);
            })
            .catch(error => {
                console.log(error);
            })
    }

    function handleGridReady(params) {
        setGridApi(params.api);
        listarMantenimientos(params.api);
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
                    rowData={mantenimientos}
                    localeText={{
                        noRowsToShow: "No hay registro de mantenimientos",
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

export default MantenimientosTuberias;