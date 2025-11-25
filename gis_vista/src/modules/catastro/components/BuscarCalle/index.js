import React, { useState } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import {
    PCHR_INGRESAR_CALLE, generarColumnasPaCalles,
    MSJ_CALLE_NO_SE_LOCALIZO
} from './values';
import { BUSCAR_CALLE } from './queries';
import Alert, { TIPO_ALERTA, mensajeInicial } from '../../../../lib/alerts';
import SearchInput from '../../../global/components/SearchInput';
import {
    CAPA_CALLES
} from '../../../values';
import { withStore } from '../../../../pages/Mapa/store/Store';
import AgGridWithSimpleMenuBar from '../../../global/components/AgGridWithSimpleMenuBar';

const BuscarCalle = ({ storeContext: { map } }) => {

    const [calle, setCalle] = useState('');
    const [calles, setCalles] = useState([]);
    const [mensaje, setMensaje] = useState(mensajeInicial);
    // parametros AG-GRID
    const [gridApi, setGridApi] = useState(null);
    const [columnDefs] = useState(generarColumnasPaCalles(handleSearchButtonClick));

    const client = useApolloClient();

    function handleInputChange(e) {
        setCalle(e.target.value.toUpperCase());
    }

    function handleSubmit(e) {
        e.preventDefault();
        gridApi.showLoadingOverlay();
        setMensaje(mensajeInicial);
        client.query({
            query: BUSCAR_CALLE,
            variables: { calle },
            fetchPolicy: "network-only"
        }).then(({ data }) => {
            const { buscarCalle } = data.catastro;
            buscarCalle.length === 0 ? gridApi.showNoRowsOverlay() : gridApi.hideOverlay();
            setCalles(buscarCalle);
        }).catch((error) => {
            setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR });
            gridApi.showNoRowsOverlay();
            setCalles([]);
        }).finally();
    }

    function handleSearchButtonClick(calle_id) {
        const capaCalles = map.getCapaById(CAPA_CALLES);
        capaCalles.getFeatures({
            cql_filter: `gid = ${calle_id}`
        }, {
            dataProjection: 'EPSG:32717',
            featureProjection: map.codeProjection
        })
            .then(fts => {
                const ft = fts[0];
                if (ft) {
                    ft.set('capa', capaCalles);
                    map.volarHastaFeature(ft);
                } else {
                    setMensaje({ texto: MSJ_CALLE_NO_SE_LOCALIZO, tipo: TIPO_ALERTA.ADVERTENCIA });
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
                <SearchInput value={calle}
                    placeholder={PCHR_INGRESAR_CALLE}
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
                    rowData={calles}
                    onGridReady={onGridReady}
                    onGridSizeChanged={() => gridApi.sizeColumnsToFit()}
                    localeText={{
                        noRowsToShow: 'No se encontraron calles',
                        loadingOoo: 'Cargando...'
                    }}
                />
            </section>
        </div>

    );
};

export default withStore(BuscarCalle);