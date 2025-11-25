import React from 'react';
import { Label, Data } from './common';

export default ({ data }) => {
    const {
        tiene_medidor,
        fecha_instalacion_medidor,
        id_medidor,
        diametro_medidor,
        estado_conservacion,
        llaves_paso,
        seguridad_medidor,
        posicion_medidor,
        marca_medidor
    } = data;

    const tiene_med = tiene_medidor !== null ? (tiene_medidor ? 'SI' : 'NO') : '';

    return (
        <div className='form'>
            <div className="form-group form-row mb-0">
                <Label>Tiene Medidor:</Label>
                <Data>{tiene_med}</Data>
                <Label>Fecha de instalación</Label>
                <Data>{fecha_instalacion_medidor}</Data>
                <Label>N° Medidor:</Label>
                <Data>{id_medidor}</Data>
                <Label>Diámetro:</Label>
                <Data>{diametro_medidor}</Data>
                <Label>Estado:</Label>
                <Data>{estado_conservacion}</Data>
                <Label>Llaves de paso:</Label>
                <Data>{llaves_paso}</Data>
                <Label>Seguridad:</Label>
                <Data>{seguridad_medidor}</Data>
                <Label>Posición:</Label>
                <Data>{posicion_medidor}</Data>
                <Label>Marca:</Label>
                <Data>{marca_medidor}</Data>
            </div>
        </div>
    )
}