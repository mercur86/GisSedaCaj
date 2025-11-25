import React, { useState } from 'react';
import { useQuery, useApolloClient } from 'react-apollo-hooks';
import Alert, { TIPO_ALERTA, mensajeInicial } from '../../../../lib/alerts';
import { APROBAR_SOLICITUD_USUARIO, DESAPROBAR_SOLICITUD_USUARIO } from './mutations';
import { LISTA_SOLICITUDES_PENDIENTES } from './queries';
import { LoadingIcon } from '../../../../lib/icons';
import {
    MSJ_NO_HAY_SOLICITUDES,
    LABEL_LISTADO_SOLICITUDES,
    generarColumnasPaSolicitudesPendientes
} from './values';
import Swal from 'sweetalert2';
import AgGrid from '../../../global/components/AgGridWithSimpleMenuBar';

const Solicitudes = ({ usuarios, actualizarListaSolicitudes }) => {
    const mensajeHayDatos = usuarios.length === 0 ? MSJ_NO_HAY_SOLICITUDES : null;

    // parametros AG-GRID
    const [gridApi, setGridApi] = useState(null);
    const [mensaje, setMensaje] = useState(mensajeInicial);
    const [columnDefs] = useState(generarColumnasPaSolicitudesPendientes(handleAprobarSolicitudUsuario, handleDesaprobarSolicitudUsuario));

    const client = useApolloClient();

    function handleAprobarSolicitudUsuario({ id: idSolicitud, nombre_completo }) {
        Swal.fire({
            title: '¡Atención!',
            text: `¿Deseas aprobar la solicitud de '${nombre_completo}?'`,
            icon: 'question',
            showCancelButton: true
        }).then(result => {
            if (result.value) {
                aprobarSolicitudUsuario(parseInt(idSolicitud));
            }
        })
    }

    function aprobarSolicitudUsuario(idSolicitud) {
        setMensaje(mensajeInicial);
        client.mutate({
            mutation: APROBAR_SOLICITUD_USUARIO,
            variables: { idSolicitud }
        }).then(({ data }) => {
            if (data.sistema.aprobarSolicitudCreacionUsuario) {
                Swal.fire('¡Buen trabajo!', 'La solicitud fue aprobada', 'success');
                actualizarListaSolicitudes();
            }
        }).catch(error => Swal.fire('¡Algo salió mal! :(', error.message, 'error'));
    }

    function handleDesaprobarSolicitudUsuario({ id: idSolicitud, nombre_completo }) {
        Swal.fire({
            title: '¡Atención!',
            text: `¿Está seguro de desaprobar la solicitud de '${nombre_completo}'?, Escribe el motivo por favor.`,
            icon: 'question',
            input: 'text',
            inputValidator: (value) => {
                if (!value) {
                    return 'Escribe el motivo por favor.'
                }
            },
            showCancelButton: true
        }).then(result => {
            if (result.value) {
                desaprobarSolicitudUsuario(parseInt(idSolicitud), result.value);
            }
        })
    }

    function desaprobarSolicitudUsuario(idSolicitud, motivo) {
        setMensaje(mensajeInicial);
        client.mutate({
            mutation: DESAPROBAR_SOLICITUD_USUARIO,
            variables: { idSolicitud, motivo }
        }).then(({ data }) => {
            if (data.sistema.desaprobarSolicitudCreacionUsuario) {
                Swal.fire('¡Hecho!', 'La solicitud del usuario fue desaprobada', "info");
                actualizarListaSolicitudes();
            }
        }).catch(error => Swal.fire('¡Algo salió mal! :(', error.message, "error"));
    }

    // funciones ag-grid
    function handleGridReady(params) {
        setGridApi(params.api);
    }

    return (
        <div className="p-2 h-100 d-flex flex-column">
            {mensajeHayDatos ?
                <Alert tipo={TIPO_ALERTA.ADVERTENCIA}>{mensajeHayDatos}</Alert> :
                <React.Fragment>
                    {mensaje.texto && <Alert tipo={mensaje.tipo}>{mensaje.texto}</Alert>}
                    <div className="flex-grow-1">
                        <AgGrid
                            className="w-100 h-100"
                            barTitle={LABEL_LISTADO_SOLICITUDES}
                            columnDefs={columnDefs}
                            rowData={usuarios}
                            defaultColDef={{
                                suppressMenu: true,
                                sortable: true,
                                resizable: true
                            }}
                            onGridReady={handleGridReady}
                            localeText={{
                                noRowsToShow: "No hay solicitudes pendientes",
                                loadingOoo: "Cargando..."
                            }}
                            onGridSizeChanged={() => gridApi.sizeColumnsToFit()}
                        />
                    </div>
                </React.Fragment>
            }
        </div>
    );
}

const AprobarSolicitudes = () => {
    const { data, error, loading, refetch } = useQuery(LISTA_SOLICITUDES_PENDIENTES, { fetchPolicy: 'network-only' });

    if (loading) return <div className="text-center mt-4"><LoadingIcon /></div>;
    if (error) return <Alert tipo={TIPO_ALERTA.ERROR}>{error.message}</Alert>;

    return (<Solicitudes usuarios={data.sistema.solicitudesPendientesCreacionUsuario} actualizarListaSolicitudes={refetch} />);
};

export default AprobarSolicitudes;