import { useMutation } from '@apollo/react-hooks';
import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { CloseIcon, PlusIcon, SaveIcon } from '../../../lib/icons';
import LabelCoordenadas from '../../catastro/components/GeoreferenciarUsuario/subcomponents/LabelCoordenas';
import InputMaskPrime from '../../global/components/InputMaskPrime';
import MarcadorOL from '../../global/components/MarcadorOL';
import { confirmSavingOptions, initialData } from './config';
import marker from '../../../assets/img/marker7.png';
import { withStore } from '../../../pages/Mapa/store/Store'
import { fromLonLat } from 'ol/proj';
import { ACTUALIZAR_INFO_CISTERNA, ADD_CISTERNA } from './queries';
import moment from 'moment';

const formatData = (data, markerRef) => {
    const coord = markerRef.current.getCoordinate();
    const vars = Object.assign(data, { longitud: coord[0], latitud: coord[1] });
    return {
        ...vars,
        horaInicial: moment(vars.horaInicial12, 'hh:mm a').format('HH:mm:ss'),
        horaFinal: moment(vars.horaFinal12, 'hh:mm a').format('HH:mm:ss'),
        longitud: parseFloat(vars.longitud),
        latitud: parseFloat(vars.latitud)
    }
};

const Form = forwardRef(({ onDataChange, storeContext: { map } }, ref) => {

    const [editing, setEditing] = useState(false);
    const [data, setData] = useState(initialData);
    const [initPosition, setInitPosition] = useState(map.getView().getCenter());
    const markerRef = useRef(null);
    const onErrorCb = useCallback(err => Swal.fire("¡Algo salió mal!", err.message, "error"), []);
    const [updateCisterna, { loading: updatingCisterna }]
        = useMutation(ACTUALIZAR_INFO_CISTERNA,
            {
                onError: onErrorCb,
                onCompleted: () => {
                    Swal.fire("¡Buen trabajo!", "La información fue actualizada.", "success");
                    setEditing(false);
                    setData(initialData);
                    onDataChange && onDataChange();
                }
            });
    const [addCisterna, { loading: savingCisterna }]
        = useMutation(ADD_CISTERNA,
            {
                onError: onErrorCb,
                onCompleted: () => {
                    Swal.fire("¡Buen trabajo!", "La cisterna fue registrada.", "success");
                    setEditing(false);
                    setData(initialData);
                    onDataChange && onDataChange(true);
                }
            });

    useImperativeHandle(ref, () => ({
        edit: (cisterna) => {
            setEditing(true);
            setData(prevData => ({ ...prevData, ...cisterna }));
            setInitPosition(fromLonLat([cisterna.longitud, cisterna.latitud], map.codeProjection));
        },
        cancel: () => onCancel()
    }));

    function handleInputChange(e) {
        const name = e.target.name,
            value = name === 'horaInicial12' || name === 'horaFinal12' ? e.target.value : e.target.value.toUpperCase();
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    function onCancel() {
        setEditing(false);
        setData(initialData);
    }

    function onSave(e) {
        e.preventDefault();
        if (!(markerRef && markerRef.current)) {
            return Swal.fire('Advertencia', 'La referencia del marcador es indefinida.', "warning");
        }
        Swal.fire(confirmSavingOptions)
            .then(result => {
                if (result.value) {
                    const variables = formatData(data, markerRef);
                    if (data.id) {
                        updateCisterna({ variables })
                    } else {
                        addCisterna({ variables });
                    }
                }
            });
    }

    function onNew() {
        setEditing(true);
        setData(initialData);
        setInitPosition(map.getView().getCenter());
    }

    return (
        <form className="form" onSubmit={onSave}>
            <div className="form-row">
                <div className="form-group col-md-4">
                    <label className="font-weight-bold">Placa <span className='required'>*</span></label>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        required
                        name="placa"
                        disabled={!editing}
                        value={data.placa}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group col-md-8">
                    <label className="font-weight-bold">Chofer <span className='required'>*</span></label>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        required
                        name="chofer"
                        disabled={!editing}
                        value={data.chofer}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="form-group">
                <label className="font-weight-bold">Dirección <span className='required'>*</span></label>
                <input
                    type="text"
                    className="form-control form-control-sm"
                    required
                    name="direccion"
                    disabled={!editing}
                    value={data.direccion}
                    onChange={handleInputChange}
                />
            </div>
            <div className="p-grid p-fluid form-row mb-3">
                <InputMaskPrime mask="99:99 am" placeholder="01:20 PM" slotChar="hh:mm am"
                    etiqueta="Hora inicio *" className="form-control form-control-sm" required
                    name="horaInicial12"
                    disabled={!editing}
                    value={data.horaInicial12}
                    onChange={handleInputChange}
                />
                <InputMaskPrime mask="99:99 am" placeholder="01:20 PM" slotChar="hh:mm am"
                    etiqueta="Hora fin *" className="form-control form-control-sm" required
                    name="horaFinal12"
                    disabled={!editing}
                    value={data.horaFinal12}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label className="font-weight-bold">Zona(s) abastecida(s)^ <span className='required'>*</span></label>
                <textarea
                    className="form-control form-control-xs"
                    rows="2"
                    required
                    name="zonasAbastecidas"
                    disabled={!editing}
                    value={data.zonasAbastecidas}
                    onChange={handleInputChange}
                />
            </div>
            {editing && <MarcadorOL ref={markerRef} initPosition={initPosition} imgMarker={marker} render={coordinate =>
                <LabelCoordenadas coordinate={coordinate} imgMarker={marker} />}>
            </MarcadorOL>}
            <div className="mt-3">
                <button disabled={editing} onClick={onNew} className="btn btn-primary btn-xs"><PlusIcon /><span className="ml-2">Nuevo</span></button>
                <button disabled={!editing} className="btn btn-success btn-xs ml-2" type='submit'><SaveIcon /><span className="ml-2">{updatingCisterna || savingCisterna ? "Guardando..." : "Guardar"}</span></button>
                <button disabled={!editing} onClick={onCancel} className="btn btn-warning btn-xs ml-2"><CloseIcon /><span className="ml-2">Cancelar</span></button>
            </div>
        </form>
    );
});

export default withStore(Form);