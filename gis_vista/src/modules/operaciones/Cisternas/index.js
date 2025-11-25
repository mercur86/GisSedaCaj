import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { mapStoreToProps } from '../../../pages/Mapa/store/Store';
import AgGrid from '../../global/components/AgGridWithSimpleMenuBar';
import Panel from '../../herramientas/FiltroAvanzado/subcomponents/Panel';
import { CAPA_CISTERNAS } from '../../values';
import { actionsDef, columnDefs, confirmDeleteOptions, defaultColDef, DELETE, DOWNLOAD, EDIT, REFRESH } from './config';
import Form from './Form';
import { CISTERNA_LIST, DELETE_CISTERNA } from './queries';

const AgGridContainer = styled.div`
    width: 100%;
    height: 520px;
`;

const Cisternas = ({ map, capaCisternas }) => {

    const [gridApi, setGridApi] = useState();
    const [selected, setSelected] = useState();
    const formRef = useRef(null);
    const panelRef = useRef(null);

    const onDataCallback = useCallback((_data) => {
        const data = _data && _data.operaciones ? _data.operaciones.listaCisternas : [];
        if (data.length) {
            gridApi.hideOverlay();
        } else {
            gridApi.showNoRowsOverlay();
        }
    }, [gridApi]);

    const [fetchCisternas, { data, refetch }] = useLazyQuery(CISTERNA_LIST, {
        onCompleted: onDataCallback,
        onError: (err) => Swal.fire("¡Algo salió mal!", err.message, "error")
    });

    const [eliminarCisterna]
        = useMutation(DELETE_CISTERNA);

    useEffect(() => {
        if (formRef && formRef.current) {
            formRef.current.cancel();
        }
    }, [selected]);

    useEffect(() => {
        if (!capaCisternas.getVisible()) {
            capaCisternas.setVisible(true);
        }
    }, [capaCisternas]);

    function onAction(actionId) {
        switch (actionId) {
            case REFRESH:
                refresh();
                break;
            case EDIT:
                if (selected && formRef && formRef.current && panelRef && panelRef.current) {
                    formRef.current.edit(selected[0]);
                    panelRef.current.open();
                }
                break;
            case DELETE:
                if (formRef && formRef.current && selected.length) {
                    Swal.fire(confirmDeleteOptions)
                        .then(result => {
                            if (result.value) {
                                eliminarCisterna({ variables: { idCisterna: selected[0].id } })
                                    .then(() => {
                                        Swal.fire("¡Hecho!", "La cisterna fue eliminada", "success");
                                        gridApi.deselectAll();
                                        refresh();
                                        capaCisternas.refresh();
                                    })
                                    .catch(err => Swal.fire("¡Algo salió mal!", err.message, "error"));
                            }
                        });
                }

                break;
            case DOWNLOAD:
                if (gridApi) {
                    gridApi.exportDataAsCsv({ fileName: "list_cisternas_gis.csv" });
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
        capaCisternas.refresh();
        if (_refresh) {
            refresh();
        }
    }

    function zoomOnFeature(_selected) {
        capaCisternas.getFeatures({
            cql_filter: `id = ${_selected[0].id}`
        }, {
            dataProjection: 'EPSG:32717',
            featureProjection: map.codeProjection
        })
            .then((fts) => {
                const ft = fts[0];
                if (ft) {
                    map.volarHastaFeature(ft, { maxZoom: 18 }, false);
                }
            })
    }

    // funciones ag-grid
    function handleGridReady(params) {
        params.api.showLoadingOverlay();
        fetchCisternas();
        setGridApi(params.api);
    }

    function handleSelectionChanged() {
        const selected = gridApi.getSelectedRows();
        setSelected(selected);
        if (selected.length) {
            zoomOnFeature(selected);
        }
    }

    const cisternas = data && data.operaciones ? data.operaciones.listaCisternas : [];

    return (
        <div className="py-3 px-2">
            <Panel ref={panelRef} title="Agregar cisterna" open={false} id="addCisternaPanel">
                <Form
                    ref={formRef}
                    onDataChange={handleDataChange}
                />
            </Panel>
            <AgGridContainer className="mt-2">
                <AgGrid
                    className="w-100 h-100"
                    barTitle="Cisternas"
                    rowData={cisternas}
                    selectedRows={selected}
                    columnDefs={columnDefs}
                    actionsDef={actionsDef}
                    onBarMenuAction={onAction}
                    onGridReady={handleGridReady}
                    onSelectionChanged={handleSelectionChanged}
                    defaultColDef={defaultColDef}
                    localeText={{
                        noRowsToShow: 'No hay cisternas para mostrar',
                        loadingOoo: "Cargando.."
                    }}
                    rowSelection="single"
                    rowDeselection={true}
                    pagination={true}
                    paginationAutoPageSize={true}
                    onGridSizeChanged={() => gridApi.sizeColumnsToFit()}
                />
            </AgGridContainer>
        </div>
    );
}

export default mapStoreToProps(Cisternas, ({ map }) => ({
    map,
    capaCisternas: map.getCapaById(CAPA_CISTERNAS)
}));