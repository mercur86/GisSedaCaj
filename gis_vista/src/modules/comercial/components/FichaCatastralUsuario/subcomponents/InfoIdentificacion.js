import React from 'react';
import { Label, Data } from './common';

export default ({
    data
}) => {
    const {
        localidad,
        id_provincia,
        id_distrito,
        id_sector_comercial,
        id_manzana,
        lote,
        sublote,
        id_ruta_lectura,
        num_secuencia_lectura,
        num_ruta_reparto,
        num_secuencia_reparto,
        v_num_inscripcion,
        categoria_principal,
        id_ciclo,
        descripcion_sector_agua,
        descripcion_sector_desague
    } = data;

    return (
        <div className='form'>
            <div className="form-group form-row mb-0">
                <Label>Localidad:</Label>
                <Data>{localidad}</Data>
                <Label>Cód. Catastral:</Label>
                <Data>{`${id_provincia}-${id_distrito}-${id_sector_comercial}-${id_manzana}-${lote}-${sublote}`}</Data>
                <Label>Rura de Lectura:</Label>
                <Data>{`${id_ruta_lectura} - ${num_secuencia_lectura}`}</Data>
                <Label>Ruta de Reparto:</Label>
                <Data>{`${num_ruta_reparto} - ${num_secuencia_reparto}`}</Data>
                <Label>Núm. Inscripción:</Label>
                <Data>{v_num_inscripcion}</Data>
                <Label>Categoría:</Label>
                <Data>{categoria_principal}</Data>
                <Label>Ciclo:</Label>
                <Data>{id_ciclo}</Data>
                <Label>Sector Agua:</Label>
                <Data>{descripcion_sector_agua}</Data>
                <Label>Sector Alcantarillado:</Label>
                <Data>{descripcion_sector_desague}</Data>
            </div>
        </div>
    )
}