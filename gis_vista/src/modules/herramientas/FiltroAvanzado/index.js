import React from 'react';
import {
    CAPA_USUARIOS,
    CAPA_TUBERIAS,
    CAPA_TUBERIAS_ALCANTARILLADO,
    CAPA_PROBLEMAS,
    CAPA_PROBLERMAS_COMERCIAL,
    CAPA_PUNTOS_CONTROL_CALIDAD,
    CAPA_RECLAMOS,
    CAPA_OTASS_NOTIFICACIONES,
    CAPA_SUMINISTROS_I3,
    CAPA_USUARIOS_SIN_SUMINISTRO
} from '../../values';
import FAUsuario from './FAUsuario';
import FASuministroI3 from './FASuministroI3';
import FATuberiaAgua from './FATuberiaAgua';
import FATuberiaAlcantarillado from './FATuberiaAlcantarillado';
import FAPuntosControlCalidad from './FAPuntosControlCalidad';
import { FAProblemasOperacionales, FAProblemasComerciales } from './FAProblemas';
import { FAReclamosOperacionales } from './FAReclamos';
import FAUsuarioSinSuministro from './FAUsuarioSinSuministro';

const FiltroAvanzado = ({ capa }) => {

    const capaId = capa.get('id');
    let Component = null;
    console.log(capaId)
    if (capaId === CAPA_USUARIOS) Component = FAUsuario;
    if (capaId === CAPA_USUARIOS_SIN_SUMINISTRO) Component = FAUsuarioSinSuministro;
    else if (capaId === CAPA_TUBERIAS) Component = FATuberiaAgua;
    else if (capaId === CAPA_TUBERIAS_ALCANTARILLADO) Component = FATuberiaAlcantarillado;
    else if (capaId === CAPA_PROBLEMAS) Component = FAProblemasOperacionales;
    else if (capaId === CAPA_RECLAMOS) Component = FAReclamosOperacionales;
    else if (capaId === CAPA_PROBLERMAS_COMERCIAL) Component = FAProblemasComerciales;
    else if (capaId === CAPA_PUNTOS_CONTROL_CALIDAD) Component = FAPuntosControlCalidad;
    else if (capaId === CAPA_OTASS_NOTIFICACIONES) Component = FAReclamosOperacionales;
    else if (capaId === CAPA_SUMINISTROS_I3) Component = FASuministroI3;

    return (
        <div className="p-2 pt-3">
            <Component />
        </div>
    )

}

export default FiltroAvanzado;