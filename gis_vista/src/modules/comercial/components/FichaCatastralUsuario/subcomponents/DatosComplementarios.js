import React from 'react';
import { Label, Data } from './common';
import { withStore } from '../../../../../pages/Mapa/store/Store';

export default withStore(({
    data,
    storeContext: { store }
}) => {
    const {
        si_tiene_pista,
        no_tiene_pista,
        material_pista,
        si_tiene_vereda,
        no_tiene_vereda,
        nivel_presion,
        tipo_piscina,
        frontera_predio,
        area_lote,
        area_construida,
        ubicacion_limite_agua,
        ubicacion_frontera_agua,
        ubicacion_limite_desague,
        ubicacion_frontera_desague,
        si_conexion_agua_interior,
        no_conexion_agua_interior,
        si_conexion_desague_interior,
        no_conexion_desague_interior,
        si_casa_sirve_negocio,
        no_casa_sirve_negocio,
        si_area_negocio_punto_agua,
        no_area_negocio_punto_agua
    } = data;

    const { sidebarMaximizado } = store;

    const tienePista = si_tiene_pista === 'X' ? 'SI' : (no_tiene_pista === 'X' ? 'NO' : '');
    const tieneVereda = si_tiene_vereda === 'X' ? 'SI' : (no_tiene_vereda === 'X' ? 'NO' : '');
    const conAguaInterior = si_conexion_agua_interior === 'X' ? 'SI' : (no_conexion_agua_interior === 'X' ? 'NO' : '');
    const conDesagueInterior = si_conexion_desague_interior === 'X' ? 'SI' : (no_conexion_desague_interior === 'X' ? 'NO' : '');
    const casaSirveNegocio = si_casa_sirve_negocio === 'X' ? 'SI' : (no_casa_sirve_negocio === 'X' ? 'NO' : '');
    const negocioPuntoAgua = si_area_negocio_punto_agua === 'X' ? 'SI' : (no_area_negocio_punto_agua === 'X' ? 'NO' : '');
    const locColWidth = sidebarMaximizado ? 5 : 12;

    return (
        <div className='form'>
            <div className="form-group form-row mb-0">
                <Label>Pista:</Label>
                <Data>{tienePista}</Data>
                <Label>Material Pista:</Label>
                <Data>{material_pista}</Data>
                <Label>Vereda:</Label>
                <Data>{tieneVereda}</Data>
                <Label>Nivel Presión:</Label>
                <Data>{nivel_presion}</Data>
                <Label>PISCINA:</Label>
                <Data>{tipo_piscina}</Data>
                <Label>Frontera (mts):</Label>
                <Data>{frontera_predio}</Data>
                <Label>Área de Lote (mts2):</Label>
                <Data>{area_lote}</Data>
                <Label>Área Construida (mts2):</Label>
                <Data>{area_construida}</Data>
            </div>
            <div className="form-row mt-4">
                <div className={`form-group col-md-${locColWidth}`}>
                    <strong className="text-underline">Ubicación de la Conexión de Agua</strong>
                    <div className="form-group form-row mb-0">
                        <Label>Límite del Predio (mts)</Label>
                        <Data>{ubicacion_limite_agua}</Data>
                        <Label>Frontera del Predio (mts)</Label>
                        <Data>{ubicacion_frontera_agua}</Data>
                    </div>
                </div>
                <div className={`form-group col-md-${locColWidth}`}>
                    <strong className="text-underline">Ubicación de la Conexión de Desagüe</strong>
                    <div className="form-group form-row mb-0">
                        <Label>Límite del Predio (mts)</Label>
                        <Data>{ubicacion_limite_desague}</Data>
                        <Label>Frontera del Predio (mts)</Label>
                        <Data>{ubicacion_frontera_desague}</Data>
                    </div>
                </div>
            </div>
            <div className="form-group form-row mb-0">
                <Label>1. Conexión de Agua externa conectada al interior</Label>
                <Data>{conAguaInterior}</Data>
            </div>
            <div className="form-group form-row mb-0">
                <Label>2. Conexión de Desagüe conectada al interior</Label>
                <Data>{conDesagueInterior}</Data>
            </div>
            <div className="form-group form-row mb-0">
                <Label>3. La casa u hogar también sirve para negocio</Label>
                <Data>{casaSirveNegocio}</Data>
            </div>
            <div className="form-group form-row mb-0">
                <Label>4. Área donde esta el negocio tiene punto de agua</Label>
                <Data>{negocioPuntoAgua}</Data>
            </div>
        </div>
    )
});