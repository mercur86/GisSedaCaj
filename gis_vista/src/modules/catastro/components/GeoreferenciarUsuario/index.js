import React, { useState, useRef, useEffect } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import MarcadorOL from '../../../global/components/MarcadorOL';
import ButtonAction from '../../../global/components/ButtonAction';
import { type, LABEL_ACEPTAR, LABEL_CANCELAR } from '../../../global/values';
import {
    LABEL_SUMINISTRO, PCHR_INGRESE_SUMINISTRO, LABEL_GEOREFERENCIAR,
    MSJ_CONFIRMAR_MOVER_USUARIO,
    TITULO_GEOREFERENCIAR_USUARIO,
    TITULO_MOVER_USUARIO
} from './values';
import { MarkerAltIcon, LoadingIcon } from '../../../../lib/icons';
import LabelCoordenadas from './subcomponents/LabelCoordenas';
import { GEOREFERENCIAR_USUARIO, MOVER_USUARIO } from './mutations';
import marker from '../../../../assets/img/marker7.png';
import { mapStoreToProps } from '../../../../pages/Mapa/store/Store';
import Swal from 'sweetalert2';
import { CAPA_USUARIOS } from '../../../values';

const msgConfirmation = {
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: LABEL_ACEPTAR,
    cancelButtonText: LABEL_CANCELAR
};

function formatData(state, coordenadas) {
    return {
        numInscripcion: parseInt(state.numInscripcion),
        numSecuenciaLectura: parseInt(state.numSecuenciaLectura) || null,
        coordenadas
    };
}

const initialFormData = { numInscripcion: "", numSecuenciaLectura: "" };

const GeoreferenciarUsuario = ({ markerInitPos, capaUsuarios }) => {
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);
    const marcadorRef = useRef(null);
    const client = useApolloClient();

    useEffect(() => {
        capaUsuarios.setVisible(true);
    }, [capaUsuarios]);

    function handleChangeInput(e) {
        const name = e.target.name,
            value = e.target.value;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        confirmarGeoreferenciar();
    }

    function georeferenciarUsuario() {
        setLoading(true);
        const coordenadas = marcadorRef.current.getCoordinate();
        const variables = formatData(formData, coordenadas);

        client.mutate({
            mutation: GEOREFERENCIAR_USUARIO,
            variables
        })
            .then(({ data }) => {
                const { mensaje, codigo_respuesta } = data.catastro.georeferenciarUsuario;
                if (codigo_respuesta === 0) {
                    confirmarMoverUsuario(variables);
                }
                else {
                    Swal.fire('¡Buen trabajo!', mensaje, 'success');
                }
            })
            .catch(error => Swal.fire('Algo salió mal :(', error.message, 'error'))
            .finally(() => setLoading(false));
    }

    function confirmarGeoreferenciar() {

        Swal.fire({
            ...msgConfirmation,
            title: TITULO_GEOREFERENCIAR_USUARIO,
            text: `¿Deseas georeferenciar al usuario con suministro '${formData.numInscripcion}' en esta ubicación?`
        })
            .then(result => {
                if (result.value) {
                    georeferenciarUsuario();
                }
            });
    }

    function confirmarMoverUsuario(variables) {

        Swal.fire({
            ...msgConfirmation,
            title: TITULO_MOVER_USUARIO,
            text: MSJ_CONFIRMAR_MOVER_USUARIO
        })
            .then(result => {
                if (result.value) {
                    moverUsuario(variables);
                }
            });
    }

    function moverUsuario(variables) {
        client.mutate({
            mutation: MOVER_USUARIO,
            variables
        })
            .then(() => Swal.fire('¡Buen trabajo!', 'El usuario ha sido movido', 'success'))
            .catch(error => Swal.fire('Algo salió mal :(', error.message, 'error'))
            .finally(() => setLoading(false));
    }

    return (
        <div className="p-3">
            <form onSubmit={handleSubmit}>
                <p className="mb-2"><span className="mr-1 text-danger">*</span><span>Campo obligatorio</span></p>
                <div className="form-row">
                    <div className="form-group col-md-5">
                        <label className="font-weight-bold">{LABEL_SUMINISTRO}<span className="ml-1 text-danger">*</span></label>
                        <input
                            type="text"
                            autoFocus={true}
                            className="form-control form-control-sm"
                            name="numInscripcion"
                            value={formData.numInscripcion}
                            maxLength={8}
                            onChange={handleChangeInput}
                            placeholder={PCHR_INGRESE_SUMINISTRO}
                            required
                        />
                    </div>
                    <div className="form-group col-md-3">
                        <label className="font-weight-bold">N° sec. lectura</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            name="numSecuenciaLectura"
                            value={formData.numSecuenciaLectura}
                            maxLength={3}
                            onChange={handleChangeInput}
                            required
                        />
                    </div>
                </div>
                <MarcadorOL ref={marcadorRef} initPosition={markerInitPos} imgMarker={marker} render={coordinate =>
                    <LabelCoordenadas coordinate={coordinate} imgMarker={marker} />}>
                </MarcadorOL>
                <ButtonAction type={type.submit} title={LABEL_GEOREFERENCIAR} className={"btn btn-primary btn-sm mt-2"} disabled={loading}>
                    <MarkerAltIcon />
                    <span className="d-none d-md-inline"> {LABEL_GEOREFERENCIAR} </span>
                </ButtonAction>
                {loading && <div className="text-center"><LoadingIcon /></div>}
            </form>
        </div>
    );
}

export default mapStoreToProps(GeoreferenciarUsuario, ({ map }) => {
    return {
        markerInitPos: map.getView().getCenter(),
        capaUsuarios: map.getCapaById(CAPA_USUARIOS)
    }
});