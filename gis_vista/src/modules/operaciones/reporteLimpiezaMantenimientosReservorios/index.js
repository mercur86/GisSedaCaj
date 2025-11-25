import React, { useRef, useState } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import CalendarPrime from '../../global/components/CalendarPrime';
import ButtonSearch from '../../global/components/ButtonSearch';
import { actionsDef, columnDefs, DOWNLOAD_ACTION, LABEL_LISTADO_LIMPMANT } from './values';
import { LABEL_BUSCAR } from '../../global/values';
import FormUbicacion from '../../herramientas/FiltroAvanzado/subcomponents/FormUbicacion';
import { getListaLimpMantReservorio } from './util';
import AgGrid from '../../global/components/AgGridWithSimpleMenuBar';
import Panel from '../../herramientas/FiltroAvanzado/subcomponents/Panel';
import Swal from 'sweetalert2';

const initialState = {
    idProvincia: '0',
    idDistrito: '0',
    fechaInicial: '',
    fechaFinal: ''
};


const ReporteLimpiezaMantenimientoReservorios = () => {
    const [formData, setFormData] = useState(initialState);
    const [listaLimpMantReservorios, setListaLimpMantReservorios] = useState([]);
    const [selected, setSelected] = useState([]);
    const panelRef = useRef(null);
    // parametros AG-GRID
    const [gridApi, setGridApi] = useState(null);

    const apolloClient = useApolloClient();

    function handleInputChange(e) {
        const name = e.target.name,
            value = e.target.value;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        gridApi.showLoadingOverlay();
        if (panelRef && panelRef.current) {
            panelRef.current.close();
        }

        getListaLimpMantReservorio(apolloClient, formData)
            .then(listaLimpMantReservorios => {
                gridApi.hideOverlay();
                if (listaLimpMantReservorios.length === 0) {
                    gridApi.showNoRowsOverlay();
                }
                console.log(listaLimpMantReservorios);
                setListaLimpMantReservorios(listaLimpMantReservorios);
            })
            .catch((error) => Swal.fire('¡Algo salió mal!', error.message, "error"))
    }

    function handleBarMenuAction(actionId) {
        switch (actionId) {
            case DOWNLOAD_ACTION:
                gridApi.exportDataAsCsv({ fileName: "reporte_limpieza_desinfeccion.csv" });
                break;
            default:
                throw new Error('Acción desconocida')
        }
    }


    // funciones ag-grid
    function handleGridReady(params) {
        setGridApi(params.api);
    }

    function handleSelectionChanged() {
        const selected = gridApi.getSelectedRows();
        setSelected(selected);
    }

    const { idProvincia, idDistrito, fechaInicial, fechaFinal } = formData;

    return (
        <div className="py-2 px-3 h-100 d-flex flex-column">
            <Panel ref={panelRef} title="Parámetros" open={true} id="repLimpMantReservoriosParamsPanel">
                <form onSubmit={handleSubmit}>
                    <FormUbicacion
                        idProvincia={idProvincia}
                        idDistrito={idDistrito}
                        onChange={handleInputChange}
                    />
                    <div className="p-grid p-fluid row mb-3">
                        <CalendarPrime
                            name='fechaInicial'
                            etiqueta={'Desde'}
                            value={fechaInicial}
                            onChangeCalendar={handleInputChange}
                            showIcon={true}
                            dateFormat="dd/mm/yy"
                            required
                            baseZIndex={1032}
                        />
                        <CalendarPrime
                            name='fechaFinal'
                            etiqueta={'Hasta'}
                            value={fechaFinal}
                            onChangeCalendar={handleInputChange}
                            showIcon={true}
                            minDate={fechaInicial}
                            dateFormat="dd/mm/yy"
                            required
                            baseZIndex={1032}
                        />
                    </div>
                    <ButtonSearch title={LABEL_BUSCAR} />
                </form>
            </Panel>
            <section className="flex-grow-1">
                <AgGrid
                    className="w-100 h-100"
                    actionsDef={actionsDef}
                    selectedRows={selected}
                    onBarMenuAction={handleBarMenuAction}
                    barTitle={LABEL_LISTADO_LIMPMANT}
                    rowData={listaLimpMantReservorios}
                    columnDefs={columnDefs}
                    onGridReady={handleGridReady}
                   // onSelectionChanged={handleSelectionChanged}
                    defaultColDef={{
                        suppressMenu: true,
                        sortable: true,
                        resizable: true
                    }}
                    localeText={{
                        noRowsToShow: 'NO hay datos',
                        loadingOoo: "Cargando.."
                    }}
               //     rowSelection="multiple"
                //    rowMultiSelectWithClick={true}
                    enableRangeSelection={true}
                    onGridSizeChanged={() => gridApi.sizeColumnsToFit()}
                    pagination={true}
                    paginationAutoPageSize={true}
                />
            </section>
        </div>
    );
};

export default ReporteLimpiezaMantenimientoReservorios;