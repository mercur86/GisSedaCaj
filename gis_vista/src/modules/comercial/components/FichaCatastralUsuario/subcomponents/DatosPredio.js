import React from 'react';
import { Label, Data } from './common';

export default ({ data }) => {
    const {
        tipo_via,
        descripcion_via,
        tipo_zona,
        descripcion_zona,
        numero_municipal,
        referencia,
        manzana_predio,
        lote_predio,
        piso,
        estado_predio,
        tipo_propiedad,
        situacion_predio,
        material_contruccion,
        tipo_reservorio,
        tipo_abastecimiento,
        tipo_alcantarillado,
        tipo_huerto_jardin,
        tipo_suministro,
        tipo_servicio,
        num_habitantes,
        num_pisos,
        flag_habitado
    } = data;

    const habitado = flag_habitado !== null ? (flag_habitado ? 'SI' : 'NO') : '';

    return (
        <div className='form'>
            <div className="form-group form-row mb-0">
                <Label>Vía:</Label>
                <Data>{`${tipo_via} ${descripcion_via}`}</Data>
                <Label>N°. Municipal:</Label>
                <Data>{numero_municipal}</Data>
                <Label>Hab. Urbana:</Label>
                <Data>{`${tipo_zona} ${descripcion_zona}`}</Data>
                <Label>Referencia:</Label>
                <Data>{referencia}</Data>
                <Label>Manzana:</Label>
                <Data>{manzana_predio}</Data>
                <Label>Lote:</Label>
                <Data>{lote_predio}</Data>
                <Label>Bloque:</Label>
                <Data></Data>
                <Label>Piso:</Label>
                <Data>{piso}</Data>
                <Label>Número:</Label>
                <Data></Data>
                <Label>Estado Predio:</Label>
                <Data>{estado_predio}</Data>
                <Label>Tipo de Propiedad:</Label>
                <Data>{tipo_propiedad}</Data>
                <Label>Situación:</Label>
                <Data>{situacion_predio}</Data>
                <Label>Material de Construcción:</Label>
                <Data>{material_contruccion}</Data>
                <Label>Tipo de Almacenamiento:</Label>
                <Data>{tipo_reservorio}</Data>
                <Label>Tipo de Abastecimiento:</Label>
                <Data>{tipo_abastecimiento}</Data>
                <Label>Tipo de Alcantarillado:</Label>
                <Data>{tipo_alcantarillado}</Data>
                <Label>Huerto/Jardín:</Label>
                <Data>{tipo_huerto_jardin}</Data>
                <Label>Tipo de Suministro:</Label>
                <Data>{tipo_suministro}</Data>
                <Label>Tipo de Servicio:</Label>
                <Data>{tipo_servicio}</Data>
                <Label>N°. Habitantes:</Label>
                <Data>{num_habitantes}</Data>
                <Label>N° Pisos:</Label>
                <Data>{num_pisos}</Data>
                <Label>Predio habitado:</Label>
                <Data>{habitado}</Data>
            </div>
        </div>)
}