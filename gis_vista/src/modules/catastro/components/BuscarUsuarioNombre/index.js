import React, { useState } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import Alert, { mensajeInicial, TIPO_ALERTA } from '../../../../lib/alerts';
import {
    MSJ_INGRESAR_APELLIDOS_NOMBRES,
    generarColumnasPaUsuarios,
    MSJ_USUARIO_NO_SE_LOCALIZO
} from './values';
import { TAG_NOMBRE, LABEL_BUSCAR } from '../../../global/values';
import { BUSCAR_SUMINISTRO_NOMBRE_TITULAR } from './queries';
import InputText from '../../../global/components/InputText';
import ButtonSearch from '../../../global/components/ButtonSearch';
import {
    CAPA_USUARIOS
} from '../../../values';
import { LISTA_PROVINCIAS } from '../../../global/components/OrganizacionTerritorial/values';
import OrganizacionTerritorial from '../../../global/components/OrganizacionTerritorial';
import { withStore } from '../../../../pages/Mapa/store/Store';
import AgGridWithSimpleMenuBar from '../../../global/components/AgGridWithSimpleMenuBar';

const BuscarUsuarioNombre = ({ storeContext: { map } }) => {
    const [nombreTitular, setNombre] = useState('');
    const [nombres, setNombres] = useState([]);
    const [idProvincia, setIdProvincia] = useState(LISTA_PROVINCIAS[0].id);
    const [idDistrito, setIdDistrito] = useState('');
    const [mensaje, setMensaje] = useState(mensajeInicial);
    // parametros AG-GRID
    const [gridApi, setGridApi] = useState(null);
    const [columnDefs] = useState(generarColumnasPaUsuarios(handleSearchButtonClick));

    const client = useApolloClient();

    function handleChangeInputNombre(e) {
        setNombre(e.target.value.toUpperCase());
    }

    function handleSubmit(e) {
        e.preventDefault();
        gridApi.showLoadingOverlay();
        setMensaje(mensajeInicial);
        client.query({
            query: BUSCAR_SUMINISTRO_NOMBRE_TITULAR, // BUSCAR_USUARIO
            variables: {
                nombreTitular, idProvincia: parseInt(idProvincia),
                idDistrito: parseInt(idDistrito)
            },
            fetchPolicy: "network-only"
        }).then(({ data }) => {
            const { buscarSuministroPorNombreTitular } = data.catastro;
            buscarSuministroPorNombreTitular.length === 0 ? gridApi.showNoRowsOverlay() : gridApi.hideOverlay();
            setNombres(data.catastro.buscarSuministroPorNombreTitular);
        }).catch((error) => {
            setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR });
            gridApi.showNoRowsOverlay();
        });
    }

    function handleSearchButtonClick(num_inscripcion) {
        const capaUsuarios = map.getCapaById(CAPA_USUARIOS);
        capaUsuarios.getFeatures({
            cql_filter: `suministro = ${num_inscripcion}`
        }, {
            dataProjection: 'EPSG:32717',
            featureProjection: map.codeProjection
        })
            .then(fts => {
                const ft = fts[0];
                if (ft) {
                    ft.set('capa', capaUsuarios);
                    map.volarHastaUsuario(ft);
                } else {
                    setMensaje({ texto: MSJ_USUARIO_NO_SE_LOCALIZO, tipo: TIPO_ALERTA.ADVERTENCIA });
                }
            }).catch((error) => setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR }));
    }

    function handleChangeUbicacionFA(e) {
        const name = e.target.name;
        const value = e.target.value;
        switch (name) {
            case 'provincia':
                let idProvincia = '';
                if (value !== "" && !isNaN(value)) idProvincia = parseInt(value);
                setIdProvincia(idProvincia);
                break;
            case 'distrito':
                const idDistrito = parseInt(e.target.value);
                setIdDistrito(idDistrito);
                break;
            default:
                break;
        }
    }

    // funciones ag-grid
    function onGridReady(params) {
        setGridApi(params.api);
    }

    return (
        <div className="p-3 d-flex flex-column h-100">
            <section>
                <form onSubmit={handleSubmit}>
                    <InputText value={nombreTitular} etiqueta={TAG_NOMBRE} placeholder={MSJ_INGRESAR_APELLIDOS_NOMBRES} onChangeInput={handleChangeInputNombre}
                        autoFocus={true} required />
                    <OrganizacionTerritorial idProvincia={idProvincia} onChangeProvincia={handleChangeUbicacionFA} idDistrito={idDistrito}
                        onChangeDistrito={handleChangeUbicacionFA} nameProvincia={'provincia'} nameDistrito={'distrito'} />
                    <ButtonSearch title={LABEL_BUSCAR} />
                </form>

                {mensaje.texto && <Alert tipo={mensaje.tipo}>{mensaje.texto}</Alert>}
            </section>
            <section className="flex-grow-1 mt-2">
                <AgGridWithSimpleMenuBar
                    className="w-100 h-100"
                    barTitle="Resultados"
                    defaultColDef={{
                        suppressMenu: true
                    }}
                    columnDefs={columnDefs}
                    rowData={nombres}
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
}

export default withStore(BuscarUsuarioNombre);