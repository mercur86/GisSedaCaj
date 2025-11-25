import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { mapStoreToProps } from '../../../pages/Mapa/store/Store';
import AgGrid from '../../global/components/AgGridWithSimpleMenuBar';
import Panel from '../../herramientas/FiltroAvanzado/subcomponents/Panel';
import { CAPA_VALVULAS_PURGA_AIRE } from '../../values';
import { defaultColDef, columnDefs, actionsDef, EDIT, DELETE, REFRESH, confirmDeleteOptions } from './config';
import Form from './Form';
import { ELIMINAR_VPA, LISTA_VPA } from './queries';

const AgGridContainer = styled.div`
    width: 100%;
    height: 520px;    
`;

const AdministrarVPAs = ({ map, capaVPA }) => {

    const [selected, setSelected] = useState([]);
    const [gridApi, setGridApi] = useState(null);
    const formRef = useRef(null);
    const panelRef = useRef(null);

    const onDataCallback = useCallback((_data) => {
        const data = _data && _data.operaciones ? _data.operaciones.listaVPAs : [];
        if (data.length) {
            gridApi.hideOverlay();
        } else {
            gridApi.showNoRowsOverlay();
        }
    }, [gridApi]);

    const [fetchValvulas, { data, refetch }] = useLazyQuery(LISTA_VPA, {
        onCompleted: onDataCallback,
        onError: (err) => Swal.fire("¡Algo salió mal!", err.message, "error")
    });

    const [eliminarValvula]
        = useMutation(ELIMINAR_VPA);

    useEffect(() => {
        if (formRef && formRef.current) {
            formRef.current.cancel();
        }
    }, [selected]);

    useEffect(() => {
        if (!capaVPA.getVisible()) {
            capaVPA.setVisible(true);
        }
    }, [capaVPA]);

    function handleBarMenuAction(actionId) {
        switch (actionId) {
            case REFRESH:
                if (gridApi) {
                    gridApi.showLoadingOverlay();
                }
                refresh();
                break;
            case EDIT:
                if (formRef && formRef.current) {
                    formRef.current.edit(selected[0]);
                    panelRef.current.open();
                }
                break;
            case DELETE:
                if (formRef && formRef.current && selected.length) {
                    Swal.fire(confirmDeleteOptions)
                        .then(result => {
                            if (result.value) {
                                eliminarValvula({ variables: { idVPA: selected[0].id } })
                                    .then(() => {
                                        Swal.fire("¡Hecho!", "La cisterna fue eliminada", "success");
                                        gridApi.deselectAll();
                                        refresh();
                                        capaVPA.refresh();
                                    })
                                    .catch(err => Swal.fire("¡Algo salió mal!", err.message, "error"));
                            }
                        });
                }
                break;
            default:
                throw new Error("Acción inválida");
        }
    }

    function refresh() {
        if (gridApi) {
            gridApi.showLoadingOverlay();
        }
        refetch()
            .then(({ data: _data }) => onDataCallback(_data))
            .catch(err => Swal.fire("¡Algo salió mal!", err.message, "error"));
    }

    function handleDataChange(_refresh) {
        if (panelRef && panelRef.current) {
            panelRef.current.close();
        }
        capaVPA.refresh();
        if (_refresh) {
            refresh();
        }
    }

    // crear función seekNZoomIn, para buscar en una capa un feature y luego hacer zoom sobre él

    function zoomOnFeature(_selected) {
        capaVPA.getFeatures({
            cql_filter: `id = ${_selected[0].id}`
        }, {
            dataProjection: 'EPSG:32717',
            featureProjection: map.codeProjection
        })
            .then((fts) => {
                const ft = fts[0];
                if (ft) {
                    map.volarHastaFeature(ft, { maxZoom: 20 }, false);
                }
            })
    }

    // funciones ag-grid
    function handleGridReady(params) {
        params.api.showLoadingOverlay();
        fetchValvulas({ variables: { idProvincia: "1", idDistrito: "1" } });
        setGridApi(params.api);
    }

    function handleSelectionChanged() {
        const selected = gridApi.getSelectedRows();
        setSelected(selected);
        if (selected.length) {
            zoomOnFeature(selected);
        }
    }

    const valvulas = data && data.operaciones ? data.operaciones.listaVPAs : [];

    return (
        <div className="py-3 px-2">
            <Panel ref={panelRef} open={true} id="addVPAPanel" title="Agregar VPA">
                <Form
                    ref={formRef}
                    onDataChange={handleDataChange}
                />
            </Panel>
            <AgGridContainer className="mt-2">
                <AgGrid
                    className="w-100 h-100"
                    barTitle="Válvulas"
                    defaultColDef={defaultColDef}
                    columnDefs={columnDefs}
                    actionsDef={actionsDef}
                    rowData={valvulas}
                    selectedRows={selected}
                    onBarMenuAction={handleBarMenuAction}
                    onGridReady={handleGridReady}
                    onSelectionChanged={handleSelectionChanged}
                    rowSelection="single"
                    rowDeselection={true}
                    pagination={true}
                    paginationAutoPageSize={true}
                    onGridSizeChanged={() => gridApi.sizeColumnsToFit()}
                    localeText={{
                        noRowsToShow: 'No hay válvulas para mostrar',
                        loadingOoo: "Cargando.."
                    }}
                />
            </AgGridContainer>
        </div>
    )
};

export default mapStoreToProps(AdministrarVPAs, ({ map }) => ({ map, capaVPA: map.getCapaById(CAPA_VALVULAS_PURGA_AIRE) }));