import React from 'react';
import { Label, Data } from './common';

export default ({ data }) => {
    const {
        fecha_conexion_agua,
        situacion_agua,
        diametro_con_agua,
        ubicacion_caja_agua,
        estado_caja_agua,
        material_caja_agua_agua,
        marco_tapa_con_agua,
        material_marco_tapa_agua,
        estado_marco_tapa_agua,
        material_con_agua
    } = data;
    return (
        <div className='form'>
            <div className="form-group form-row mb-0">
                <Label>Fecha Conexión</Label>
                <Data>{fecha_conexion_agua}</Data>
                <Label>Situación:</Label>
                <Data>{situacion_agua}</Data>
                <Label>Diámetro de Conexión:</Label>
                <Data>{diametro_con_agua}</Data>
                <Label>Ubicación Caja:</Label>
                <Data>{ubicacion_caja_agua}</Data>
                <Label>Estado Caja:</Label>
                <Data>{estado_caja_agua}</Data>
                <Label>Material Caja:</Label>
                <Data>{material_caja_agua_agua}</Data>
                <Label>Marco y Tapa:</Label>
                <Data>{marco_tapa_con_agua}</Data>
                <Label>Material Marco Tapa:</Label>
                <Data>{material_marco_tapa_agua}</Data>
                <Label>Estado Marco Tapa:</Label>
                <Data>{estado_marco_tapa_agua}</Data>
                <Label>Material Conexión:</Label>
                <Data>{material_con_agua}</Data>
            </div>
        </div>
    )
}