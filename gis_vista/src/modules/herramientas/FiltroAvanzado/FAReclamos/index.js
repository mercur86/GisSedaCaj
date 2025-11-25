import React from 'react';
import {
    LABEL_UBICACION,
    LABEL_SECCION_CARACTERISTICAS_PROBLEMA
} from '../values';
import FormUbicacion from '../subcomponents/FormUbicacion';
import Panel from '../subcomponents/Panel';
import { ButtonGroup, FiltrarBtn, QuitarFiltroBtn } from '../../FilterButtons';
import withFilter from '../withFilter';
import { CAPA_PROBLERMAS_COMERCIAL, CAPA_RECLAMOS } from '../../../values';
import FormInfoTipoProblema from '../subcomponents/FormInfoTipoProblema';

const FAReclamos = ({
    area,
    parametros,
    handleChange,
    filtroHaCambiado,
    filtered,
    handleChangeFilter,
    handleRemoveFilter
}) => {

    const {
        idProvincia,
        idDistrito,
        tipoReclamo,
        estadoReclamo,
        periodoRegistroFechaInf,
        periodoRegistroFechaSup,
    } = parametros;

    const title = area === 'OPERACIONAL' ? 'Operacionales' : 'Comerciales';

    return (
        <div className="card border-filtro">
            <div className='form'>
                <div className="card-header px-2 pt-1 pb-2 bg-filtro font-size-titulo">
                    <strong>Problemas {title}</strong>
                    <ButtonGroup capa={true} className='card-header-actions'>
                        {() => {
                            return (
                                <React.Fragment>
                                    <FiltrarBtn
                                        className='btn-xs'
                                        disabled={!filtroHaCambiado}
                                        onClick={handleChangeFilter}
                                    />
                                    <QuitarFiltroBtn
                                        className='btn-xs ml-1'
                                        visible={filtered}
                                        onClick={handleRemoveFilter}
                                    />
                                </React.Fragment>
                            );
                        }}
                    </ButtonGroup>
                </div>
                <div className="card-body p-1">
                    <Panel open={true} title={LABEL_UBICACION} id="FAPInfoUbicacion">
                        <FormUbicacion
                            idProvincia={idProvincia}
                            idDistrito={idDistrito}
                            onChange={handleChange}
                        />
                    </Panel>
                    <Panel title={LABEL_SECCION_CARACTERISTICAS_PROBLEMA} id="FAPInfoProblema">
                        <FormInfoTipoProblema
                            area={area.toUpperCase()}
                            tipoReclamo={tipoReclamo}
                            estadoReclamo={estadoReclamo}
                            periodoRegistroFechaInf={periodoRegistroFechaInf}
                            periodoRegistroFechaSup={periodoRegistroFechaSup}
                            onChange={handleChange}
                        />
                    </Panel>
                </div>
            </div>
        </div>
    );
};

export const FAReclamosOperacionales = withFilter(FAReclamos, ({ map }) => ({
    capa: map.getCapaById(CAPA_RECLAMOS),
    capaKey: 'reclamosOperacionales',
    area: 'OPERACIONAL'
}));

export const FAReclamosComerciales = withFilter(FAReclamos, ({ map }) => ({
    capa: map.getCapaById(CAPA_PROBLERMAS_COMERCIAL),
    capaKey: 'problemasComerciales',
    area: 'COMERCIAL'
}));