import React, { useState } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import { BUSCAR_HABILITACION_URBANA } from './queries';
import {
    PCHR_INGRESAR_HABILITACION_URBANA,
    generarColumnasPaHabilitacionesUrbanas,
    MSJ_HABILITACION_URBANA_NO_SE_LOCALIZO
} from './values';
import Alert, { mensajeInicial, TIPO_ALERTA } from '../../../../lib/alerts';
import SearchInput from '../../../global/components/SearchInput';
import {
    CAPA_HABILITACIONES_URBANAS
} from '../../../values';
import { withStore } from '../../../../pages/Mapa/store/Store';
import AgGridWithSimpleMenuBar from '../../../global/components/AgGridWithSimpleMenuBar';

const BuscarHabilitacionUrbana = ({ storeContext: { map } }) => {

    const [habilitacionUrbana, setUrbanizacion] = useState('');
    const [urbanizaciones, setUrbanizaciones] = useState([]);
    const [mensaje, setMensaje] = useState(mensajeInicial);
    // parametros AG-GRID
    const [gridApi, setGridApi] = useState(null);
    const [columnDefs] = useState(generarColumnasPaHabilitacionesUrbanas(handleSearchButtonClick));

    const client = useApolloClient();

    function handleInputChange(e) {
        setUrbanizacion(e.target.value.toUpperCase());
    }

    function handleSubmit(e) {
        e.preventDefault();
        gridApi.showLoadingOverlay();
        setMensaje(mensajeInicial);
        client.query({
            query: BUSCAR_HABILITACION_URBANA,
            variables: { habilitacionUrbana },
            fetchPolicy: "network-only"
        }).then(({ data }) => {
            const { buscarHabilitacionUrbana } = data.catastro;
            buscarHabilitacionUrbana.length === 0 ? gridApi.showNoRowsOverlay() : gridApi.hideOverlay();
            setUrbanizaciones(buscarHabilitacionUrbana);
        }).catch((error) => {
            setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR });
            gridApi.showNoRowsOverlay();
        });
    }

    function handleSearchButtonClick(urbanizacion_id) {
        const habUrbanas = map.getCapaById(CAPA_HABILITACIONES_URBANAS);
        habUrbanas
            .getFeatures({
                cql_filter: `gid = ${urbanizacion_id}`
            }, {
                dataProjection: 'EPSG:32717',
                featureProjection: 'EPSG:3857'
            })
            .then(fts => {
                const ft = fts[0];
                if (ft) {
                    ft.set('capa', habUrbanas
                    );
                    map.volarHastaFeature(ft);
                } else {
                    setMensaje({ texto: MSJ_HABILITACION_URBANA_NO_SE_LOCALIZO, tipo: TIPO_ALERTA.ADVERTENCIA });
                }
            }).catch((error) => setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR }));
    }

    // funciones ag-grid
    function onGridReady(params) {
        setGridApi(params.api);
    }

    return (
        <div className="px-3 pt-1 pb-3 d-flex flex-column h-100">
            <section>
                <SearchInput value={habilitacionUrbana}
                    placeholder={PCHR_INGRESAR_HABILITACION_URBANA}
                    autoFocus={true}
                    onInputChange={handleInputChange}
                    onSubmit={handleSubmit} />
                {mensaje.texto && <Alert tipo={mensaje.tipo}>{mensaje.texto}</Alert>}
            </section>
            <section className="flex-grow-1">
                <AgGridWithSimpleMenuBar
                    className="w-100 h-100"
                    barTitle="Resultados"
                    defaultColDef={{
                        suppressMenu: true
                    }}
                    columnDefs={columnDefs}
                    rowData={urbanizaciones}
                    onGridReady={onGridReady}
                    onGridSizeChanged={() => gridApi.sizeColumnsToFit()}
                    localeText={{
                        noRowsToShow: 'No se encontraron habilitaciones urbanas',
                        loadingOoo: 'Cargando...'
                    }}
                />
            </section>
        </div>
    );
};

export default withStore(BuscarHabilitacionUrbana);