import React from 'react';
import { Label, Data } from './common';

export default ({ data }) => {
    const {
        fecha_conexion_desague,
        situacion_desague,
        diametro_con_desague,
        ubicacion_caja_desague,
        estado_caja_desague,
        material_caja_desague,
        marco_tapa_con_desague,
        material_marco_tapa_desague,
        estado_tapa_desague
    } = data;
    return (
        <div className='form'>
            <div className="form-group form-row mb-0">
                <Label>Fecha Conexión</Label>
                <Data>{fecha_conexion_desague}</Data>
                <Label>Situación:</Label>
                <Data>{situacion_desague}</Data>
                <Label>Diámetro de Conexión:</Label>
                <Data>{diametro_con_desague}</Data>
                <Label>Ubicación Caja:</Label>
                <Data>{ubicacion_caja_desague}</Data>
                <Label>Estado Caja:</Label>
                <Data>{estado_caja_desague}</Data>
                <Label>Material Caja:</Label>
                <Data>{material_caja_desague}</Data>
                <Label>Marco y Tapa:</Label>
                <Data>{marco_tapa_con_desague}</Data>
                <Label>Material Tapa:</Label>
                <Data>{material_marco_tapa_desague}</Data>
                <Label>Estado Tapa:</Label>
                <Data>{estado_tapa_desague}</Data>
            </div>
        </div>
    )
}