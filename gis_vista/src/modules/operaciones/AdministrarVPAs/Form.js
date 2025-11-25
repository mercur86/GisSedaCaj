import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { CloseIcon, PlusIcon, SaveIcon } from '../../../lib/icons';
import MarcadorOL from '../../global/components/MarcadorOL';
import marker from '../../../assets/img/marker7.png';
import LabelCoordenadas from '../../catastro/components/GeoreferenciarUsuario/subcomponents/LabelCoordenas';
import { withStore } from '../../../pages/Mapa/store/Store';
import { confirmSavingOptions, initialData } from './config';
import { transform } from 'ol/proj';
import Swal from 'sweetalert2';
import { useMutation } from '@apollo/react-hooks';
import { ACTUALIZAR_DATOS_VPA, REGISTRAR_VPA } from './queries';

const formatData = (data, markerRef) => {
    const coord = markerRef.current.getCoordinate();
    const variables = Object.assign(data, { longitud: coord[0], latitud: coord[1] });
    return variables;
}

const Form = forwardRef(({ onDataChange, storeContext: { map } }, ref) => {
    const [data, setData] = useState(initialData)
    const [editing, setEditing] = useState(false);
    const [initPosition, setInitPosition] = useState(map.getView().getCenter());
    const markerRef = useRef(null);
    const inputRef = useRef(null);
    const onErrorCb = useCallback((err) => Swal.fire("¡Algo salió mal!", err.message, "error"), []);
    const [updateValvula, { loading: updatingValvula }]
        = useMutation(ACTUALIZAR_DATOS_VPA,
            {
                onError: onErrorCb,
                onCompleted: () => {
                    Swal.fire("¡Buen trabajo!", "La información fue actualizada.", "success");
                    setEditing(false);
                    setData(initialData);
                    onDataChange && onDataChange();
                }
            });
    const [addVPA, { loading: savingVPA }]
        = useMutation(REGISTRAR_VPA,
            {
                onError: onErrorCb,
                onCompleted: () => {
                    Swal.fire("¡Buen trabajo!", "La válvula fue registrada.", "success");
                    setEditing(false);
                    setData(initialData);
                    onDataChange && onDataChange();
                }
            });

    useImperativeHandle(ref, () => ({
        edit: (vpa) => {
            setEditing(true);
            setData(prevData => ({ ...prevData, ...vpa }));
            const vpaCoord = transform([vpa.este, vpa.norte], 'EPSG:32717', map.codeProjection);
            setInitPosition(vpaCoord);
            if (inputRef && inputRef.current) {
                inputRef.current.focus();
            }
        },
        cancel: () => handleCancel()
    }));

    function handleInputChange(e) {
        const name = e.target.name,
            value = e.target.value;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    function handleCancel() {
        setEditing(false);
        setData(initialData);
    }

    function handleSave() {
        if (!(markerRef && markerRef.current)) {
            return Swal.fire('Advertencia', 'La referencia del marcador es indefinida.', "warning");
        }
        Swal.fire(confirmSavingOptions)
            .then(result => {
                if (result.value) {
                    const variables = formatData(data, markerRef);
                    if (data.id) {
                        updateValvula({ variables });
                    } else {
                        addVPA({ variables });
                    }
                }
            })
    }

    function handleNew() {
        setEditing(true);
        setData(initialData);
        setInitPosition(map.getView().getCenter());
    }

    return (
        <div className="form">

            <div className="form-group">
                <label className="font-weight-bold">Referencia para Identificación</label>
                <input
                    ref={inputRef}
                    type="text"
                    className="form-control form-control-sm"
                    required
                    name="referenciaIdentificacion"
                    autoFocus={true}
                    value={data.referenciaIdentificacion || ''}
                    onChange={handleInputChange}
                    disabled={!editing}
                />
                <small className="form-text text-muted">
                    Dato que facilite la identificación de la válvula.
                </small>
            </div>

            {editing && <MarcadorOL ref={markerRef} initPosition={initPosition} imgMarker={marker} render={coordinate =>
                <LabelCoordenadas coordinate={coordinate} imgMarker={marker} />}>
            </MarcadorOL>}
            <div className="mt-3">
                <button disabled={editing} onClick={handleNew} className="btn btn-primary btn-xs"><PlusIcon /><span className="ml-2">Nuevo</span></button>
                <button disabled={!editing} onClick={handleSave} className="btn btn-success btn-xs ml-2"><SaveIcon /><span className="ml-2">{updatingValvula || savingVPA ? "Guardando..." : "Guardar"}</span></button>
                <button disabled={!editing} onClick={handleCancel} className="btn btn-warning btn-xs ml-2"><CloseIcon /><span className="ml-2">Cancelar</span></button>
            </div>
        </div>
    );
});

export default withStore(Form);