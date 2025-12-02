import React, { useState } from 'react';
import InputText from '../../../global/components/InputText';
import SelectOption from '../../../global/components/SelectOption';
import ButtonAction from '../../../global/components/ButtonAction';
import Alert, { mensajeInicial, TIPO_ALERTA } from '../../../../lib/alerts';
import ProgressBarAnimated from '../../../global/components/ProgressbarAnimated';
import { type, LABEL_ACEPTAR } from '../../../global/values';
import { CheckIcon } from '../../../../lib/icons';
import { Mutation } from "react-apollo";
import { withStore } from '../../../../pages/Mapa/store/Store';
import { INSERTAR_COORDENADAS } from './mutatios';

// Valores iniciales
const initFormData = {
    crs: 'EPSG:4326',
    ax: '',
    ay: '',
    bx: '',
    by: '',
    distancia: ''
};

const InsertarCoordenadas = ({ storeContext: { map } }) => {

    const [formData, setFormData] = useState(initFormData);
    const [mensaje, setMensaje] = useState(mensajeInicial);
    const [cargando, setCargando] = useState(false);

    // ---------------------------
    // HANDLERS
    // ---------------------------

    // Input estándar
    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    // SelectOption (no usa e.target)
    function handleCrsChange(value) {
        setFormData(prev => ({
            ...prev,
            crs: value
        }));
    }

    // ---------------------------
    // SUBMIT (Mutation)
    // ---------------------------

    async function handleSubmit(e, insertarCoordenadas) {
        e.preventDefault();
        setMensaje(mensajeInicial);

        // Validaciones
        if (!formData.ax || !formData.ay || !formData.bx || !formData.by) {
            setMensaje({
                texto: 'Complete los puntos A y B.',
                tipo: TIPO_ALERTA.ADVERTENCIA
            });
            return;
        }

        try {
            setCargando(true);

            await insertarCoordenadas({
                variables: {
                    input: formData
                }
            });

        } catch (error) {
            setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR });
        } finally {
            setCargando(false);
        }
    }

    // ---------------------------
    // RENDER
    // ---------------------------

    return (
        <div className="p-2">

            <Mutation
                mutation={INSERTAR_COORDENADAS}
                onCompleted={(resp) => {

                    if (resp.sistema.insertarCoordenada.ok) {
                        setMensaje({
                            texto: resp.sistema.insertarCoordenada.mensaje,
                            tipo: TIPO_ALERTA.EXITO
                        });
                    } else {
                        setMensaje({
                            texto: resp.sistema.insertarCoordenada.mensaje,
                            tipo: TIPO_ALERTA.ADVERTENCIA
                        });
                    }

                }}
                onError={(err) => {
                    setMensaje({ texto: err.message, tipo: TIPO_ALERTA.ERROR });
                }}
            >
                {(insertarCoordenadas, { loading }) => (
                    <form onSubmit={(e) => handleSubmit(e, insertarCoordenadas)}>

                        {/* CRS */}
                        <SelectOption
                            name="crs"
                            value={formData.crs}
                            etiqueta="Sistema de Coordenadas"
                            lista={[
                                { id: 'EPSG:4326', nombre: 'EPSG:4326 (Lat/Lon)' },
                                { id: 'EPSG:32717', nombre: 'EPSG:32717 (UTM 17S)' }
                            ]}
                            onChangeSelect={handleCrsChange}
                        />

                        {/* PUNTO A */}
                        <InputText
                            name='ax'
                            value={formData.ax}
                            etiqueta="Punto A - latitud"
                            onChangeInput={handleInputChange}
                        />
                        <InputText
                            name='ay'
                            value={formData.ay}
                            etiqueta="Punto A - longitud"
                            onChangeInput={handleInputChange}
                        />

                        {/* PUNTO B */}
                        <InputText
                            name='bx'
                            value={formData.bx}
                            etiqueta="Punto B - latitud"
                            onChangeInput={handleInputChange}
                        />
                        <InputText
                            name='by'
                            value={formData.by}
                            etiqueta="Punto B - longitud"
                            onChangeInput={handleInputChange}
                        />

                        {/* DISTANCIA (opcional) */}
                        <InputText
                            name='distancia'
                            value={formData.distancia}
                            etiqueta="Distancia"
                            onChangeInput={handleInputChange}
                        />

                        {/* MENSAJE */}
                        {mensaje.texto && (
                            <Alert tipo={mensaje.tipo}>{mensaje.texto}</Alert>
                        )}

                        {/* BOTÓN */}
                        <ButtonAction
                            type={type.submit}
                            title={LABEL_ACEPTAR}
                            className="btn btn-sm btn-primary mb-2"
                        >
                            <CheckIcon /> Aceptar
                        </ButtonAction>

                        {(cargando || loading) && (
                            <ProgressBarAnimated titulo="Procesando..." />
                        )}

                    </form>
                )}
            </Mutation>

        </div>
    );
};

export default withStore(InsertarCoordenadas);
