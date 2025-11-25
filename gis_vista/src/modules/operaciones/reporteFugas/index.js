import React, { useRef, useState } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import CalendarPrime from '../../global/components/CalendarPrime';
import ButtonSearch from '../../global/components/ButtonSearch';
import { actionsDef, columnDefs, deleteConfirmationOpts, DELETE_ACTION, DOWNLOAD_ACTION, LABEL_LISTADO_FUGAS } from './values';
import { LABEL_BUSCAR } from '../../global/values';
import FormUbicacion from '../../herramientas/FiltroAvanzado/subcomponents/FormUbicacion';
import { eliminarFugas, getListaFugas } from './util';
import AgGrid from '../../global/components/AgGridWithSimpleMenuBar';
import Panel from '../../herramientas/FiltroAvanzado/subcomponents/Panel';
import Swal from 'sweetalert2';

const initialState = {
    idProvincia: '0',
    idDistrito: '0',
    fechaInicial: '',
    fechaFinal: '',
    filtroFecha: '0'
};


const ReporteFugas = () => {
    const [formData, setFormData] = useState(initialState);
    const [listaFugas, setListaFugas] = useState([]);
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

        getListaFugas(apolloClient, formData)
            .then(listaFugas => {
                gridApi.hideOverlay();
                if (listaFugas.length === 0) {
                    gridApi.showNoRowsOverlay();
                }
                setListaFugas(listaFugas);
            })
            .catch((error) => Swal.fire('¡Algo salió mal!', error.message, "error"))
    }

    function handleBarMenuAction(actionId) {
        switch (actionId) {
            case DOWNLOAD_ACTION:
                gridApi.exportDataAsCsv({ fileName: "reporte_fugas_gis.csv" });
                break;
            case DELETE_ACTION:
                Swal.fire(deleteConfirmationOpts)
                    .then((result) => {
                        if (result.value) {
                            const idsFugas = selected.map(f => parseInt(f.id));
                            eliminarFugas(apolloClient, idsFugas)
                                .then(() => {
                                    const msj = idsFugas.length > 1 ? "Las fugas han sido eliminadas." : "La fuga ha sido eliminada";
                                    Swal.fire("¡Hecho!", msj, "success");
                                    setListaFugas(oldList => {
                                        const leftItems = oldList.filter(f => idsFugas.indexOf(parseInt(f.id)) === -1);
                                        return leftItems;
                                    });
                                })
                                .catch((error) => Swal.fire('¡Algo salió mal!', error.message, "error"));
                        }
                    })
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

    const { idProvincia, idDistrito, fechaInicial, fechaFinal, filtroFecha } = formData;

    return (
        <div className="py-2 px-3 h-100 d-flex flex-column">
            <Panel ref={panelRef} title="Parámetros" open={true} id="repFugasParamsPanel">
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
                    <div className="form-group">
                        <label className="font-weight-bold">Filtrar por</label>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio" name="filtroFecha"
                                id="repFugasRad1"
                                value="0"
                                checked={filtroFecha === "0"}
                                onChange={handleInputChange}
                            />
                            <label className="form-check-label cursor-pointer" htmlFor="repFugasRad1">Fecha en que inició la fuga</label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="filtroFecha"
                                id="repFugasRad2"
                                value="1"
                                checked={filtroFecha === "1"}
                                onChange={handleInputChange}
                            />
                            <label className="form-check-label cursor-pointer" htmlFor="repFugasRad2">Fecha en que se controló la fuga</label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="filtroFecha"
                                id="repFugasRad3"
                                value="2"
                                checked={filtroFecha === "2"}
                                onChange={handleInputChange}
                            />
                            <label className="form-check-label cursor-pointer" htmlFor="repFugasRad3">Fecha en que se registró la fuga</label>
                        </div>
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
                    barTitle={LABEL_LISTADO_FUGAS}
                    rowData={listaFugas}
                    columnDefs={columnDefs}
                    onGridReady={handleGridReady}
                    onSelectionChanged={handleSelectionChanged}
                    defaultColDef={{
                        suppressMenu: true,
                        sortable: true,
                        resizable: true
                    }}
                    localeText={{
                        noRowsToShow: 'No hay reporte de fugas',
                        loadingOoo: "Cargando.."
                    }}
                    rowSelection="multiple"
                    rowMultiSelectWithClick={true}
                    enableRangeSelection={true}
                    onGridSizeChanged={() => gridApi.sizeColumnsToFit()}
                    pagination={true}
                    paginationAutoPageSize={true}
                />
            </section>
        </div>
    );
};

export default ReporteFugas;