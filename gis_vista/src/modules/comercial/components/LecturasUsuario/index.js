import React, { useState } from "react";
import AgGrid from "../../../global/components/AgGridWithSimpleMenuBar";
import { Link } from "react-router-dom";
import {
    columnDefs,
    LISTAR_LECTURAS_SUMINISTRO
} from "./config";
import { useApolloClient } from "react-apollo-hooks";

const getLecturas = (apolloClient, suministro) => {
    return apolloClient.query({
        query: LISTAR_LECTURAS_SUMINISTRO,
        variables: { suministro }
    }).then(({ data }) => data.comercial.lecturasUsuario);
}

const LecturasUsuario = ({
    suministro,
    nombre_usuario
}) => {
    const [lecturas, setLecturas] = useState([]);
    const [gridApi, setGridApi] = useState(null);
    const apolloClient = useApolloClient();

    function mostrarLecturas(_gridApi) {
        _gridApi.showLoadingOverlay();
        getLecturas(apolloClient, suministro)
            .then(_lecturas => {
                if (_lecturas.length) {
                    _gridApi.hideOverlay();
                } else {
                    _gridApi.showNoRowsOverlay();
                }
                setLecturas(_lecturas);
            })
            .catch(error => {
                console.log(error);
            })
    }

    function handleGridReady(params) {
        setGridApi(params.api);
        mostrarLecturas(params.api);
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
                    barTitle={`LECTURAS SUMINISTRO ${suministro} | ${nombre_usuario}`}
                    defaultColDef={{
                        suppressMenu: true,
                        sortable: true
                    }}
                    columnDefs={columnDefs}
                    rowData={lecturas}
                    localeText={{
                        noRowsToShow: "No hay lecturas",
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

export default LecturasUsuario;