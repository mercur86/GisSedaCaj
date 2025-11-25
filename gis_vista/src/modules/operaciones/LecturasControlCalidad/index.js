import React, { useState } from 'react';
import AgGrid from '../../global/components/AgGridWithSimpleMenuBar';
import { useLazyQuery } from '@apollo/react-hooks';
import { LECTURAS_CONTROL_CALIDAD } from './queries';
import { Link } from 'react-router-dom';

const columnDefs = [
    {
        headerName: "Fecha lectura",
        field: "fecha_lectura",
        width: 100,
        minWidth: 100,
        sortable: true
    }, {
        headerName: "Parámetro",
        field: "parametro",
        width: 100,
        minWidth: 100
    }, {
        headerName: "Valor",
        field: "valor",
        width: 50,
        minWidth: 50,
        sortable: true
    }
]

const LecturasControlCalidad = ({
    codigo: codigoPunto,
    id_tipo_fuente_abastecimiento: tipoFuente
}) => {
    const [lecturas, setLecturas] = useState([]);
    const [gridApi, setGridApi] = useState(null);
    const [fetchData] = useLazyQuery(LECTURAS_CONTROL_CALIDAD, {
        fetchPolicy: "network-only",
        onCompleted: onDataReady
    });

    function onDataReady(data) {
        const { lecturasPuntoControlCalidad: ls } = data.operaciones;
        ls.length > 0 ? gridApi.hideOverlay() : gridApi.showNoRowsOverlay();
        setLecturas(ls);
    }

    function getLecturas(gridapi) {
        gridapi.showLoadingOverlay();
        fetchData({
            variables: { codigoPunto, tipoFuente }
        });
    }

    function handleGridReady(params) {
        setGridApi(params.api);
        getLecturas(params.api);
    }

    const title = `LECTURAS PUNTO CÓDIGO: ${codigoPunto}`;

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
                    barTitle={title}
                    defaultColDef={{
                        suppressMenu: true,
                        sortable: true
                    }}
                    columnDefs={columnDefs}
                    rowData={lecturas}
                    selectedRows={[]}
                    onGridReady={handleGridReady}
                    pagination={true}
                    paginationPageSize={15}
                    localeText={{
                        noRowsToShow: 'No hay lecturas',
                        loadingOoo: 'Cargando...'
                    }}
                    onGridSizeChanged={() => gridApi.sizeColumnsToFit()}
                />
            </section>
        </div>
    );
}

export default LecturasControlCalidad;