import React from 'react';
import { Label, Data } from './common';

export default ({ data }) => {
    const {
        flag_posee_trampa_grasa,
        flag_punto_muestreo
    } = data;

    const tieneTrampaGrasa = flag_posee_trampa_grasa !== null ? (flag_posee_trampa_grasa ? 'SI' : 'NO') : '';
    const esPuntoMuestreo = flag_punto_muestreo !== null ? (flag_punto_muestreo ? 'SI' : 'NO') : '';

    return (
        <div className='form'>
            <div className="form-group form-row mb-0">
                <Label>Trampa de Grasa:</Label>
                <Data>{tieneTrampaGrasa}</Data>
                <Label>Punto de muestreo:</Label>
                <Data>{esPuntoMuestreo}</Data>
            </div>
        </div>
    )
}